import { PrismaClient } from "../app/generated/prisma/client"; 
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
  prismaClientNative: PrismaClient; 
}; 

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined. Please check your environment variables.");
}

function createPrismaClient() {
  const pool = new Pool({ 
    connectionString,
    max: 10, // Reverted to 10: pushing this higher overloaded the upstream Supabase PgBouncer pooler limit
    idleTimeoutMillis: 10000, // Reduced from 30s to 10s to drop idle connections before Supabase does
    connectionTimeoutMillis: 10000, // Increased to 10s just in case
    keepAlive: true, // Send TCP keepalive packets to prevent silent drops
  });

  // Catch unhandled errors on idle connections to prevent the process from crashing
  pool.on("error", (err) => {
    console.error("PrismaPg Pool Error: Unexpected error on idle client", err);
  });

  if (process.env.NODE_ENV !== "production") {
    setInterval(() => {
      console.log(`[PG POOL STATS] Total: ${pool.totalCount} | Idle: ${pool.idleCount} | Waiting: ${pool.waitingCount}`);
    }, 10000).unref(); // Use unref() so this timer doesn't keep the Node process alive indefinitely
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = (() => {
  if (globalForPrisma.prismaClientNative) {
    console.log("Prisma: reusing global singleton");
    return globalForPrisma.prismaClientNative;
  }
  console.log("Prisma: creating new client");
  return createPrismaClient();
})();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaClientNative = prisma;
}
