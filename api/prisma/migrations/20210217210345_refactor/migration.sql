/*
  Warnings:

  - The migration will change the primary key for the `Game` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `seasonId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `hasWinnerId` on the `Game` table. All the data in the column will be lost.
  - The `id` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `spread` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The migration will change the primary key for the `Pick` table. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Pick` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The migration will change the primary key for the `Player` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Player` table. All the data in the column will be lost.
  - The `id` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The migration will change the primary key for the `Team` table. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[name]` on the table `Player`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name]` on the table `Team`. If there are existing duplicate values, the migration will fail.
  - Added the required column `season` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `week` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `playerId` on the `Pick` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `teamId` on the `Pick` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gameId` on the `Pick` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TeamField" AS ENUM ('HOME', 'AWAY');

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_hasWinnerId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_teamId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "seasonId",
DROP COLUMN "homeTeamId",
DROP COLUMN "awayTeamId",
DROP COLUMN "hasWinnerId",
ADD COLUMN     "season" INTEGER NOT NULL,
ADD COLUMN     "winnerId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "week",
ADD COLUMN     "week" INTEGER NOT NULL,
ALTER COLUMN "spread" DROP NOT NULL,
ALTER COLUMN "spread" SET DATA TYPE DOUBLE PRECISION,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_pkey",
ADD COLUMN     "correct" BOOLEAN,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "playerId",
ADD COLUMN     "playerId" INTEGER NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER NOT NULL,
DROP COLUMN "gameId",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "GameTeam" (
    "field" "TeamField" NOT NULL,
    "teamId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    PRIMARY KEY ("teamId","gameId")
);

-- DropTable
DROP TABLE "Season";

-- CreateIndex
CREATE UNIQUE INDEX "Player.name_unique" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Team.name_unique" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "GameTeam" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTeam" ADD FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD FOREIGN KEY ("winnerId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
