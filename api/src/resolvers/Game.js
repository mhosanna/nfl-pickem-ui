function season(parent, args, context) {
  return context.prisma.game.findUnique({ where: { id: parent.id } }).season();
}

function homeTeam(parent, args, context) {
  return context.prisma.game
    .findUnique({ where: { id: parent.id } })
    .homeTeam();
}

function awayTeam(parent, args, context) {
  return context.prisma.game
    .findUnique({ where: { id: parent.id } })
    .awayTeam();
}

function hasWinner(parent, args, context) {
  return context.prisma.game
    .findUnique({ where: { id: parent.id } })
    .hasWinner();
}

module.exports = {
  season,
  homeTeam,
  awayTeam,
  hasWinner,
};
