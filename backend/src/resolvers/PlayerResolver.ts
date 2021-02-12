import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
} from "type-graphql";
import { Context } from "../context";
import { Pick } from "../types/Pick";
import { Player } from "../types/Player";

@InputType()
class PlayerIDInput {
  @Field((type) => String)
  id: string;
}

@Resolver(Player)
export class PlayerResolver {
  @Query((returns) => Player, { nullable: true })
  player(@Arg("where") where: PlayerIDInput, @Ctx() ctx: Context) {
    return ctx.prisma.player.findUnique({
      where: { id: where.id },
    });
  }
  @Query((returns) => [Player])
  filterPlayers(
    @Arg("searchString") searchString: string,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.player.findMany({
      where: {
        name: { contains: searchString },
      },
    });
  }
  @Query((returns) => [Player])
  players(@Ctx() ctx: Context) {
    return ctx.prisma.player.findMany();
  }

  @Mutation((returns) => Player)
  addPlayer(@Arg("name") name: string, @Ctx() ctx: Context): Promise<Player> {
    return ctx.prisma.player.create({
      data: {
        name: name,
      },
    });
  }
  @Mutation((returns) => Player, { nullable: true })
  deletePlayer(
    @Arg("where") where: PlayerIDInput,
    @Ctx() ctx: Context
  ): Promise<Player | null> {
    return ctx.prisma.player.delete({
      where: {
        id: where.id,
      },
    });
  }
}
