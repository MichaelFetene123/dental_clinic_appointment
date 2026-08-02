import { PrismaClient } from "../app/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg"; 
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
  pool: Pool;
}; 

if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Configure pool for Supabase to avoid idle connection drops
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    max: 10,
  });
}

const adapter = new PrismaPg(globalForPrisma.pool); 

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, 
  }); 

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
