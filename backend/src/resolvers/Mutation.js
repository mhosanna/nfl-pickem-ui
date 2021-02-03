async function createPlayer(parent, args, context, info) {
  return await context.prisma.player.create({
    data: {
      name: args.name,
    },
  });
}

async function updatePlayer(parent, args, context, info) {
  return await context.prisma.player.update({
    where: { id: args.id },
    data: { name: args.name },
  });
}

async function deletePlayer(parent, args, context, info) {
  return await context.prisma.player.delete({
    where: { id: args.id },
  });
}

async function createGame(parent, args, context, info) {
  return await context.prisma.game.create({
    data: {
      week: args.week,
      homeTeamId: args.homeId,
      awayTeamId: args.awayId,
      spread: args.spread,
      seasonId: args.seasonId,
    },
  });
}

async function deleteGame(parent, args, context, info) {
  return await context.prisma.game.delete({
    where: { id: args.id },
  });
}

async function createTeam(parent, args, context, info) {
  return await context.prisma.team.create({
    data: {
      name: args.name,
      city: args.city,
    },
  });
}

async function createSeason(parent, args, context, info) {
  return await context.prisma.season.create({
    data: {
      year: args.year,
    },
  });
}
async function deleteSeason(parent, args, context, info) {
  return await context.prisma.season.delete({
    where: { id: args.id },
  });
}

module.exports = {
  createPlayer,
  updatePlayer,
  deletePlayer,
  createGame,
  deleteGame,
  createTeam,
  createSeason,
  deleteSeason,
};
