/*
  Warnings:

  - The primary key for the `Spawn` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pitch` on the `Spawn` table. All the data in the column will be lost.
  - You are about to drop the column `yaw` on the `Spawn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Spawn" DROP CONSTRAINT "Spawn_pkey",
DROP COLUMN "pitch",
DROP COLUMN "yaw",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Spawn_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Spawn_id_seq";
