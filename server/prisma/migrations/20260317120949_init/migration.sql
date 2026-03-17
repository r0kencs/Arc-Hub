-- CreateEnum
CREATE TYPE "MouseClick" AS ENUM ('LEFT', 'RIGHT', 'BOTH');

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilityType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UtilityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThrowTechnique" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ThrowTechnique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Side" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Side_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lineup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "mouseClick" "MouseClick" NOT NULL DEFAULT 'LEFT',
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "z" DOUBLE PRECISION NOT NULL,
    "pitch" DOUBLE PRECISION NOT NULL,
    "yaw" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Lineup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spawn" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "sideId" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "z" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Spawn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LineupSides" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LineupSides_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LineupTechniques" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LineupTechniques_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Map_name_key" ON "Map"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UtilityType_name_key" ON "UtilityType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ThrowTechnique_name_key" ON "ThrowTechnique"("name");

-- CreateIndex
CREATE INDEX "Lineup_mapId_typeId_idx" ON "Lineup"("mapId", "typeId");

-- CreateIndex
CREATE INDEX "Spawn_mapId_sideId_idx" ON "Spawn"("mapId", "sideId");

-- CreateIndex
CREATE UNIQUE INDEX "Spawn_mapId_name_key" ON "Spawn"("mapId", "name");

-- CreateIndex
CREATE INDEX "_LineupSides_B_index" ON "_LineupSides"("B");

-- CreateIndex
CREATE INDEX "_LineupTechniques_B_index" ON "_LineupTechniques"("B");

-- AddForeignKey
ALTER TABLE "Lineup" ADD CONSTRAINT "Lineup_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lineup" ADD CONSTRAINT "Lineup_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "UtilityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "_LineupTechniques" ADD CONSTRAINT "_LineupTechniques_B_fkey" FOREIGN KEY ("B") REFERENCES "ThrowTechnique"("id") ON DELETE CASCADE ON UPDATE CASCADE;
