function champion(parent, args, context) {
  return context.prisma.season
    .findUnique({ where: { id: parent.id } })
    .champion();
}

module.exports = {
  champion,
};
