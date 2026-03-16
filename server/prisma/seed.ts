import { prisma } from "../src/lib/prisma";

const maps = [
  { id: "de_mirage", name: "Mirage" },
  { id: "de_inferno", name: "Inferno" },
  { id: "de_dust2", name: "Dust II" },
  { id: "de_nuke", name: "Nuke" },
  { id: "de_overpass", name: "Overpass" },
  { id: "de_ancient", name: "Ancient" },
  { id: "de_anubis", name: "Anubis" },
];

const utilityTypes = [
  { id: "smoke", name: "Smoke" },
  { id: "molotov", name: "Molotov" },
  { id: "flashbang", name: "Flashbang" },
  { id: "hegrenade", name: "HE Grenade" },
];

const throwTechniques = [
  { id: "jump", name: "Jump" },
  { id: "run", name: "Running" },
  { id: "walk", name: "Walking" },
  { id: "crouch", name: "Crouching" },
  { id: "w", name: "W" },
];

async function main() {
  /* for (const map of maps) {
    await prisma.map.upsert({
      where: { id: map.id },
      update: {},
      create: map,
    });
  } */

  await prisma.map.createMany({
    data: maps,
    skipDuplicates: true,
  });

  await prisma.utilityType.createMany({
    data: utilityTypes,
    skipDuplicates: true,
  });

  await prisma.throwTechnique.createMany({
    data: throwTechniques,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
