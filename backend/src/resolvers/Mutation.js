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

module.exports = {
  createPlayer,
  updatePlayer,
  deletePlayer,
};
