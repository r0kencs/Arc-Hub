/*
  Warnings:

  - The primary key for the `Spawn` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Spawn" DROP CONSTRAINT "Spawn_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Spawn_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Spawn_id_seq";
