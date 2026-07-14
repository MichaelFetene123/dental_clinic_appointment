import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/app/generated/prisma/client";
import { hashPassword } from "../src/lib/bcrypt";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await hashPassword("admin@123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@clinic.com" },
    update: {
        password: hashedPassword,
     },
    create: {
      email: "admin@clinic.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });
  
  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });