import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

const ARCHIVE_MONTHS_THRESHOLD = 6;
const DELETE_YEARS_THRESHOLD = 2; // User requested 2 years instead of 6

async function run() {
  const startTime = new Date();
  console.log(`[${startTime.toISOString()}] --- Starting AuditLog Archival Job ---`);

  const archiveDateThreshold = new Date();
  archiveDateThreshold.setMonth(archiveDateThreshold.getMonth() - ARCHIVE_MONTHS_THRESHOLD);

  const deleteDateThreshold = new Date();
  deleteDateThreshold.setFullYear(deleteDateThreshold.getFullYear() - DELETE_YEARS_THRESHOLD);

  console.log(`[${new Date().toISOString()}] Config: Archiving older than ${archiveDateThreshold.toISOString()}`);
  console.log(`[${new Date().toISOString()}] Config: Purging older than ${deleteDateThreshold.toISOString()}`);

  let archivedCount = 0;
  let purgedCount = 0;
  let jobError: Error | null = null;

  try {
    // 1. Find AuditLogs to archive
    const logsToArchive = await prisma.auditLog.findMany({
      where: {
        timestamp: {
          lt: archiveDateThreshold,
        },
      },
    });

    if (logsToArchive.length > 0) {
      console.log(`[${new Date().toISOString()}] Found ${logsToArchive.length} AuditLog(s) to archive. Starting transaction...`);

      await prisma.$transaction(async (tx) => {
        // Map the payload to exactly match AuditLogArchive
        const archivePayload = logsToArchive.map((log) => ({
          id: log.id,
          userId: log.userId,
          action: log.action,
          resource: log.resource,
          resourceId: log.resourceId,
          details: log.details,
          ipAddress: log.ipAddress,
          timestamp: log.timestamp,
        }));

        // Insert into Archive
        await tx.auditLogArchive.createMany({
          data: archivePayload,
          skipDuplicates: true,
        });

        // Delete from active AuditLog
        const idsToDelete = logsToArchive.map((log) => log.id);
        const deleteResult = await tx.auditLog.deleteMany({
          where: {
            id: {
              in: idsToDelete,
            },
          },
        });
        
        archivedCount = deleteResult.count;
        console.log(`[${new Date().toISOString()}] Transaction complete. Successfully archived ${archivedCount} record(s).`);
      });
    } else {
      console.log(`[${new Date().toISOString()}] No active AuditLogs found to archive.`);
    }

    // 2. Hard-delete from AuditLogArchive
    console.log(`[${new Date().toISOString()}] Checking for old AuditLogArchive records to hard delete...`);
    const purgeResult = await prisma.auditLogArchive.deleteMany({
      where: {
        timestamp: {
          lt: deleteDateThreshold,
        },
      },
    });

    purgedCount = purgeResult.count;
    if (purgedCount > 0) {
      console.log(`[${new Date().toISOString()}] Hard-deleted ${purgedCount} old AuditLogArchive record(s).`);
    } else {
      console.log(`[${new Date().toISOString()}] No old AuditLogArchive records found to delete.`);
    }
  } catch (error: any) {
    jobError = error;
    console.error(`[${new Date().toISOString()}] ERROR during archival job:`, error);
  } finally {
    await prisma.$disconnect();
    
    // Final clear summary block for cPanel cron logs
    console.log('\n=======================================');
    console.log('         JOB EXECUTION SUMMARY         ');
    console.log('=======================================');
    console.log(`Timestamp:       ${new Date().toISOString()}`);
    console.log(`Rows Archived:   ${archivedCount}`);
    console.log(`Rows Purged:     ${purgedCount}`);
    console.log(`Status:          ${jobError ? 'FAILED' : 'SUCCESS'}`);
    if (jobError) {
      console.log(`Error Msg:       ${jobError.message}`);
    }
    console.log('=======================================\n');

    if (jobError) {
      process.exit(1);
    }
  }
}

run();
