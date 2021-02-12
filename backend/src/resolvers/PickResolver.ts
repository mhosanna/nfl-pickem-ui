import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  InputType,
  Field,
} from "type-graphql";
import { Context } from "../context";
import { Pick } from "../types/Pick";
import { Player } from "../types/Player";

@InputType()
class PickIDInput {
  @Field((type) => String)
  id: string;
}

@Resolver(Pick)
export class PickResolver {
  @FieldResolver()
  player(@Root() pick: Pick, @Ctx() ctx: Context): Promise<Player | null> {
    return ctx.prisma.pick
      .findUnique({
        where: {
          id: pick.id,
        },
      })
      .player();
  }

  @Query((returns) => Pick, { nullable: true })
  pick(@Arg("where") where: PickIDInput, @Ctx() ctx: Context) {
    return ctx.prisma.pick.findUnique({
      where: { id: where.id },
    });
  }

  @Query((returns) => [Pick])
  picks(@Ctx() ctx: Context) {
    return ctx.prisma.pick.findMany();
  }

  @Mutation((returns) => Pick)
  createPick(
    @Arg("playerId") playerId: string,
    @Arg("gameId") gameId: string,
    @Arg("teamId") teamId: string,

    @Ctx() ctx: Context
  ): Promise<any> {
    return ctx.prisma.pick.create({
      data: {
        player: {
          connect: {
            id: playerId,
          },
        },
        game: {
          connect: {
            id: gameId,
          },
        },
        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });
  }
  @Mutation((returns) => Pick, { nullable: true })
  deleteOnePick(
    @Arg("where") where: PickIDInput,
    @Ctx() ctx: Context
  ): Promise<any | null> {
    return ctx.prisma.pick.delete({
      where: {
        id: where.id,
      },
    });
  }
}
