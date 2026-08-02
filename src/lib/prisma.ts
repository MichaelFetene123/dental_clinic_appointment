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

// Re-use a single Pool in development to avoid exhausting connections
function createPrismaClient() {
  const pool = new Pool({ connectionString });
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
