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

  const resources = [
    { name: "patient", actions: ["read", "create", "edit", "delete"] },
    { name: "appointment", actions: ["read", "create", "edit", "delete"] },
    { name: "staff", actions: ["read", "create", "edit", "delete"] },
    { name: "portal_users", actions: ["read", "manage"] }
  ];

  for (const resource of resources) {
    for (const action of resource.actions) {
      const id = `${resource.name}.${action}`;
      await prisma.permission.upsert({
        where: { id },
        update: {},
        create: {
          id,
          resource: resource.name,
          action,
          description: `Can ${action} ${resource.name}`,
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

  console.log("Seeding Admin role...");
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "Administrator with all permissions",
    },
  });

  const allPerms = await prisma.permission.findMany();
  for (const p of allPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRole.id, permissionId: p.id } },
      update: {},
      create: { roleId: adminRole.id, permissionId: p.id },
    });
  }
  console.log("Admin role seeded with all permissions.");


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