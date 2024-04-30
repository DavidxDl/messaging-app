/*
  Warnings:

  - You are about to drop the column `imgURl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "imgURl",
ADD COLUMN     "imgUrl" TEXT NOT NULL DEFAULT '';
