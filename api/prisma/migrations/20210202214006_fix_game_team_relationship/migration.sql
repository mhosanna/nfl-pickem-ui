/*
  Warnings:

  - You are about to drop the column `teamId` on the `Game` table. All the data in the column will be lost.
  - Added the required column `hasWinnerId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Game_homeTeamId_unique";

-- DropIndex
DROP INDEX "Game_awayTeamId_unique";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_teamId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "teamId",
ADD COLUMN     "hasWinnerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD FOREIGN KEY ("hasWinnerId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
