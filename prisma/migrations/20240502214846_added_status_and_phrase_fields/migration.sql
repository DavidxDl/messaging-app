-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phrase" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ONLINE';
