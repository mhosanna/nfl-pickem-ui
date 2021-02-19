import { PrismaClient } from "@prisma/client";

// Instantiate Prisma Client
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  // await prisma.pick.deleteMany({});
  //await prisma.player.deleteMany({});
  //await prisma.gameTeam.deleteMany({});
  // await prisma.team.deleteMany({});
  //await prisma.game.deleteMany({});

  const playersNames = ["Madeline", "Matthew", "Mike", "Sue", "David", "Eddie"];
  const footballTeams = [
    {
      city: "Arizona",
      name: "Cardinals",
      abr: "ARI",
      conf: "NFC",
      div: "West",
    },
    {
      city: "Atlanta",
      name: "Falcons",
      abr: "ATL",
      conf: "NFC",
      div: "South",
    },
    {
      city: "Baltimore",
      name: "Ravens",
      abr: "BAL",
      conf: "AFC",
      div: "North",
    },
    {
      city: "Buffalo",
      name: "Bills",
      abr: "BUF",
      conf: "AFC",
      div: "EAST",
    },
    {
      city: "Carolina",
      name: "Panthers",
      abr: "CAR",
      conf: "NFC",
      div: "South",
    },
    {
      city: "Chicago",
      name: "Bears",
      abr: "CHI",
      conf: "NFC",
      div: "North",
    },
    {
      city: "Cincinnati",
      name: "Bengals",
      abr: "CIN",
      conf: "AFC",
      div: "North",
    },
    {
      city: "Cleveland",
      name: "Browns",
      abr: "CLE",
      conf: "AFC",
      div: "North",
    },
    {
      city: "Dallas",
      name: "Cowboys",
      abr: "DAL",
      conf: "NFC",
      div: "East",
    },
    {
      city: "Denver",
      name: "Broncos",
      abr: "DEN",
      conf: "AFC",
      div: "West",
    },
    {
      city: "Detroit",
      name: "Lions",
      abr: "DET",
      conf: "NFC",
      div: "North",
    },
    {
      city: "Green Bay",
      name: "Packers",
      abr: "GB",
      conf: "NFC",
      div: "North",
    },
    {
      city: "Houston",
      name: "Texans",
      abr: "HOU",
      conf: "AFC",
      div: "South",
    },
    {
      city: "Indianapolis",
      name: "Colts",
      abr: "IND",
      conf: "AFC",
      div: "South",
    },
    {
      city: "Jacksonville",
      name: "Jaquars",
      abr: "JAX",
      conf: "AFC",
      div: "South",
    },
    {
      city: "Kansas City",
      name: "Chiefs",
      abr: "KC",
      conf: "AFC",
      div: "West",
    },
    {
      city: "Las Vegas",
      name: "Raiders",
      abr: "OAK",
      conf: "AFC",
      div: "West",
    },
    {
      city: "Los Angeles",
      name: "Chargers",
      abr: "SD",
      conf: "AFC",
      div: "West",
    },
    {
      city: "Los Angeles",
      name: "Rams",
      abr: "STL",
      conf: "NFC",
      div: "West",
    },
    {
      city: "Miami",
      name: "Dolphins",
      abr: "MIA",
      conf: "AFC",
      div: "East",
    },
    {
      city: "Minnesota",
      name: "Vikings",
      abr: "MIN",
      conf: "AFC",
      div: "North",
    },
    {
      city: "New England",
      name: "Patriots",
      abr: "NE",
      conf: "AFC",
      div: "East",
    },
    {
      city: "New Orleans",
      name: "Saints",
      abr: "NO",
      conf: "NFC",
      div: "South",
    },
    {
      city: "New York",
      name: "Giants",
      abr: "NYG",
      conf: "NFC",
      div: "East",
    },
    {
      city: "New York",
      name: "Jets",
      abr: "NYJ",
      conf: "AFC",
      div: "East",
    },
    {
      city: "Philadelphia",
      name: "Eagles",
      abr: "PHI",
      conf: "NFC",
      div: "East",
    },
    {
      city: "Pittsburgh",
      name: "Steelers",
      abr: "PIT",
      conf: "AFC",
      div: "North",
    },
    {
      city: "San Francisco",
      name: "49ers",
      abr: "SF",
      conf: "NFC",
      div: "West",
    },
    {
      city: "Seattle",
      name: "Seahawks",
      abr: "SEA",
      conf: "NFC",
      div: "West",
    },
    {
      city: "Tampa Bay",
      name: "Buccaneers",
      abr: "TB",
      conf: "NFC",
      div: "South",
    },
    {
      city: "Tennessee",
      name: "Titans",
      abr: "TEN",
      conf: "AFC",
      div: "South",
    },
    {
      city: "Washington",
      name: "Football Team",
      abr: "WAS",
      conf: "NFC",
      div: "East",
    },
  ];

  for (const name of playersNames) {
    const player = await prisma.player.create({
      data: {
        name: name,
      },
    });
    console.log({ player });
  }

  footballTeams.forEach(async (team) => {
    const t = await prisma.team.create({
      data: {
        name: team.name,
        city: team.city,
      },
    });
    console.log({ t });
  });

  // const gameOne = await prisma.game.create({
  //   data: {
  //     season: 2018,
  //     week: 1,
  //     spread: -3.5,
  //   },
  // });
  // console.log({ gameOne });

  // const gameTeamRelationshipHome = await prisma.gameTeam.create({
  //   data: {
  //     field: "HOME",
  //     gameId: 5,
  //     teamId: 9,
  //   },
  // });
  // const gameTeamRelationshipAway = await prisma.gameTeam.create({
  //   data: {
  //     field: "AWAY",
  //     gameId: 5,
  //     teamId: 10,
  //   },
  // });

  // console.log({ gameTeamRelationshipHome });
  // console.log({ gameTeamRelationshipAway });

  // const madelinePick = await prisma.pick.create({
  //   data: {
  //     player: {
  //       connect: { id: 19 },
  //     },
  //     game: {
  //       connect: { id: 5 },
  //     },
  //     team: {
  //       connect: { id: 9 },
  //     },
  //   },
  //   include: {
  //     player: true,
  //     game: true,
  //     team: true,
  //   },
  // });

  // console.log({ madelinePick });
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
