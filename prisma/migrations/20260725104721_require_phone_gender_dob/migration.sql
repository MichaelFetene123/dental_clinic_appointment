/*
  Warnings:

  - Made the column `gender` on table `PatientProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateOfBirth` on table `PatientProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `PatientProfile` required. This step will fail if there are existing NULL values in that column.

*/

-- Safety: Backfill NULL values before enforcing NOT NULL constraints
UPDATE "PatientProfile" SET "phone" = '' WHERE "phone" IS NULL;
UPDATE "PatientProfile" SET "gender" = 'OTHER' WHERE "gender" IS NULL;
UPDATE "PatientProfile" SET "dateOfBirth" = '1900-01-01 00:00:00' WHERE "dateOfBirth" IS NULL;

-- AlterTable
ALTER TABLE "PatientProfile" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "dateOfBirth" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
