"use server";

import { prisma } from "@/lib/prisma";

export async function searchPatients(query: string = "") {
  const normalizedQuery = query.trim().toLowerCase();

  try {
    const patients = await prisma.patient.findMany({
      where: normalizedQuery ? {
        OR: [
          { name: { contains: normalizedQuery, mode: 'insensitive' } },
          { email: { contains: normalizedQuery, mode: 'insensitive' } },
          { phone: { contains: normalizedQuery, mode: 'insensitive' } },
        ],
      } : undefined,
      take: 50, // Limit initial results for performance
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
      orderBy: {
        name: 'asc'
      }
    });

    return patients;
  } catch (error) {
    console.error("Error searching patients:", error);
    return [];
  }
}
