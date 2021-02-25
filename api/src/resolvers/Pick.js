function player(parent, args, context) {
  return context.prisma.pick.findUnique({ where: { id: parent.id } }).player();
}

function game(parent, args, context) {
  return context.prisma.pick.findUnique({ where: { id: parent.id } }).game();
}

function team(parent, args, context) {
  return context.prisma.pick.findUnique({ where: { id: parent.id } }).team();
}

module.exports = {
  player,
  game,
  team,
};
