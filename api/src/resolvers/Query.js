function info(params) {
  return "This is the API of the NFL Pickem League Website";
}

function players(parent, args, context) {
  return context.prisma.player.findMany();
}

function games(parent, args, context) {
  return context.prisma.game.findMany();
}

function teams(parent, args, context) {
  return context.prisma.team.findMany();
}

function seasons(parent, args, context) {
  return context.prisma.season.findMany();
}

module.exports = {
  info,
  players,
  games,
  teams,
  seasons,
};
