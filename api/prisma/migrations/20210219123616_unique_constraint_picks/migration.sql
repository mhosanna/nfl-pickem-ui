/*
  Warnings:

  - The migration will change the primary key for the `Pick` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will add a unique constraint covering the columns `[playerId,gameId]` on the table `Pick`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Pick.playerId_gameId_unique" ON "Pick"("playerId", "gameId");
