import { PrismaClient } from "@prisma/client";

// Instantiate Prisma Client
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  await prisma.pick.deleteMany({});
  await prisma.player.deleteMany({});
  await prisma.gameTeam.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.game.deleteMany({});

  const madeline = await prisma.player.create({
    data: {
      name: "Madeline",
    },
  });

  console.log({ madeline });

  const gameOne = await prisma.game.create({
    data: {
      season: 2018,
      week: 1,
      spread: -3.5,
      teams: {
        create: [
          {
            field: "AWAY",
            team: {
              create: {
                city: "Denver",
                name: "Broncos",
              },
            },
          },
          {
            field: "HOME",
            team: {
              create: {
                city: "Baltimore",
                name: "Ravens",
              },
            },
          },
        ],
      },
    },
    include: {
      teams: true,
    },
  });

  console.log({ gameOne });

  const madelinePick = await prisma.pick.create({
    data: {
      player: {
        connect: { name: "Madeline" },
      },
      game: {
        connect: { id: gameOne.id },
      },
      team: {
        connect: { name: "Broncos" },
      },
    },
    include: {
      player: true,
      game: true,
      team: true,
    },
  });

  console.log({ madelinePick });
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
