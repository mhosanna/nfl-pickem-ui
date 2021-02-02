function info(params) {
  return "This is the API of the NFL Pickem League Website";
}

function players(parent, args, context) {
  return context.prisma.player.findMany();
}

module.exports = {
  info,
  players,
};
