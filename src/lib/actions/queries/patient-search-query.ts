"use server";

import { prisma } from "@/lib/prisma";

export async function searchPatients(query: string) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.trim().toLowerCase();

  try {
    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { name: { contains: normalizedQuery, mode: 'insensitive' } },
          { email: { contains: normalizedQuery, mode: 'insensitive' } },
          { phone: { contains: normalizedQuery, mode: 'insensitive' } },
        ],
      },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    return patients;
  } catch (error) {
    console.error("Error searching patients:", error);
    return [];
  }
}
