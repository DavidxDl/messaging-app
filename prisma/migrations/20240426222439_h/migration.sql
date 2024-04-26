/*
  Warnings:

  - You are about to drop the `friendship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_friendId_fkey";

-- DropForeignKey
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_friendOfId_fkey";

-- DropTable
DROP TABLE "friendship";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "destineId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "friendId" TEXT NOT NULL,
    "friendOfId" TEXT NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("friendId","friendOfId")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_destineId_fkey" FOREIGN KEY ("destineId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friendOfId_fkey" FOREIGN KEY ("friendOfId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
