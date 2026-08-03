import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });

async function main() {
    const { prisma } = require('./src/lib/prisma');
    const patients = await prisma.patient.findMany({
        select: { id: true, createdAt: true },
        orderBy: { createdAt: 'desc' }
    });
    console.log(`Total patients in DB: ${patients.length}`);
    if (patients.length > 0) {
        console.log(`Latest patient createdAt: ${patients[0].createdAt.toISOString()}`);
        console.log(`Oldest patient createdAt: ${patients[patients.length - 1].createdAt.toISOString()}`);
    }

    const appointments = await prisma.appointment.findMany({
        select: { id: true, date: true, patientId: true },
        orderBy: { date: 'desc' }
    });
    console.log(`Total appointments in DB: ${appointments.length}`);
}

main().catch(console.error).finally(() => process.exit(0));
