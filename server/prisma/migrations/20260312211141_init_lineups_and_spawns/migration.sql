/*
  Warnings:

  - The values [MIDDLE] on the enum `MouseClick` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Lineup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `originPlaceId` on the `Lineup` table. All the data in the column will be lost.
  - You are about to drop the column `targetPlaceId` on the `Lineup` table. All the data in the column will be lost.
  - The primary key for the `_LineupTechniques` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MouseClick_new" AS ENUM ('LEFT', 'RIGHT', 'BOTH');
ALTER TABLE "public"."Lineup" ALTER COLUMN "mouseClick" DROP DEFAULT;
ALTER TABLE "Lineup" ALTER COLUMN "mouseClick" TYPE "MouseClick_new" USING ("mouseClick"::text::"MouseClick_new");
ALTER TYPE "MouseClick" RENAME TO "MouseClick_old";
ALTER TYPE "MouseClick_new" RENAME TO "MouseClick";
DROP TYPE "public"."MouseClick_old";
ALTER TABLE "Lineup" ALTER COLUMN "mouseClick" SET DEFAULT 'LEFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "Lineup" DROP CONSTRAINT "Lineup_originPlaceId_fkey";

-- DropForeignKey
ALTER TABLE "Lineup" DROP CONSTRAINT "Lineup_targetPlaceId_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_mapId_fkey";

-- DropForeignKey
ALTER TABLE "_LineupTechniques" DROP CONSTRAINT "_LineupTechniques_A_fkey";

-- AlterTable
ALTER TABLE "Lineup" DROP CONSTRAINT "Lineup_pkey",
DROP COLUMN "originPlaceId",
DROP COLUMN "targetPlaceId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lineup_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Lineup_id_seq";

-- AlterTable
ALTER TABLE "_LineupTechniques" DROP CONSTRAINT "_LineupTechniques_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_LineupTechniques_AB_pkey" PRIMARY KEY ("A", "B");

-- DropTable
DROP TABLE "Place";

-- CreateTable
CREATE TABLE "Side" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Side_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spawn" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "sideId" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "z" DOUBLE PRECISION NOT NULL,
    "pitch" DOUBLE PRECISION NOT NULL,
    "yaw" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Spawn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LineupSides" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LineupSides_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Spawn_mapId_sideId_idx" ON "Spawn"("mapId", "sideId");

-- CreateIndex
CREATE UNIQUE INDEX "Spawn_mapId_name_key" ON "Spawn"("mapId", "name");

-- CreateIndex
CREATE INDEX "_LineupSides_B_index" ON "_LineupSides"("B");

-- CreateIndex
CREATE INDEX "Lineup_mapId_typeId_idx" ON "Lineup"("mapId", "typeId");

-- AddForeignKey
ALTER TABLE "Spawn" ADD CONSTRAINT "Spawn_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spawn" ADD CONSTRAINT "Spawn_sideId_fkey" FOREIGN KEY ("sideId") REFERENCES "Side"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineupSides" ADD CONSTRAINT "_LineupSides_A_fkey" FOREIGN KEY ("A") REFERENCES "Lineup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineupSides" ADD CONSTRAINT "_LineupSides_B_fkey" FOREIGN KEY ("B") REFERENCES "Side"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineupTechniques" ADD CONSTRAINT "_LineupTechniques_A_fkey" FOREIGN KEY ("A") REFERENCES "Lineup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
