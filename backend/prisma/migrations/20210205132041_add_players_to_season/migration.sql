/*
  Warnings:

  - You are about to drop the column `playerId` on the `Season` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "seasonId" TEXT;

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "playerId";

-- AddForeignKey
ALTER TABLE "Player" ADD FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;
