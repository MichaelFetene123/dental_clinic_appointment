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
  console.log("Seeding permissions...");

  const resources = ["patient", "appointment", "staff"];
  const actions = ["read", "create", "edit", "delete"];

  for (const resource of resources) {
    for (const action of actions) {
      const id = `${resource}.${action}`;
      await prisma.permission.upsert({
        where: { id },
        update: {},
        create: {
          id,
          resource,
          action,
          description: `Can ${action} ${resource}`,
        },
      });
    }
  }
  
  console.log("Permissions seeded.");
  console.log("Seeding super admin...");

  const hashedPassword = await hashPassword("admin@123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@clinic.com" },
    update: {
      password: hashedPassword,
      isSuperAdmin: true,
    },
    create: {
      email: "admin@clinic.com",
      password: hashedPassword,
      name: "Admin User",
      isSuperAdmin: true,
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