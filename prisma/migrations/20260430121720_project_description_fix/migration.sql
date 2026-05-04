/*
  Warnings:

  - You are about to drop the column `descrition` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT;
