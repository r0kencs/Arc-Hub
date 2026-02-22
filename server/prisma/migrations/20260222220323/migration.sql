/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Map` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `UtilityType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MouseClick" AS ENUM ('LEFT', 'MIDDLE', 'RIGHT');

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThrowTechnique" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ThrowTechnique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lineup" (
    "id" SERIAL NOT NULL,
    "mapId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "mouseClick" "MouseClick" NOT NULL DEFAULT 'LEFT',
    "originPlaceId" INTEGER NOT NULL,
    "targetPlaceId" INTEGER NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "z" DOUBLE PRECISION NOT NULL,
    "pitch" DOUBLE PRECISION NOT NULL,
    "yaw" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Lineup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LineupTechniques" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LineupTechniques_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_name_mapId_key" ON "Place"("name", "mapId");

-- CreateIndex
CREATE UNIQUE INDEX "ThrowTechnique_name_key" ON "ThrowTechnique"("name");

-- CreateIndex
CREATE INDEX "_LineupTechniques_B_index" ON "_LineupTechniques"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Map_name_key" ON "Map"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UtilityType_name_key" ON "UtilityType"("name");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lineup" ADD CONSTRAINT "Lineup_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lineup" ADD CONSTRAINT "Lineup_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "UtilityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lineup" ADD CONSTRAINT "Lineup_originPlaceId_fkey" FOREIGN KEY ("originPlaceId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lineup" ADD CONSTRAINT "Lineup_targetPlaceId_fkey" FOREIGN KEY ("targetPlaceId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineupTechniques" ADD CONSTRAINT "_LineupTechniques_A_fkey" FOREIGN KEY ("A") REFERENCES "Lineup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineupTechniques" ADD CONSTRAINT "_LineupTechniques_B_fkey" FOREIGN KEY ("B") REFERENCES "ThrowTechnique"("id") ON DELETE CASCADE ON UPDATE CASCADE;
