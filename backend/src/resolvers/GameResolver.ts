import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from "type-graphql";
import { Context } from "../context";
import { Game } from "../types/Game";

@InputType()
class GameIDInput {
  @Field((type) => String)
  id: string;
}

@Resolver(Game)
export class GameResolver {
  @Query((returns) => Game, { nullable: true })
  post(@Arg("where") where: GameIDInput, @Ctx() ctx: Context) {
    return ctx.prisma.game.findUnique({
      where: { id: where.id },
    });
  }

  @Query((returns) => [Game])
  filterPosts(@Arg("searchString") searchString: string, @Ctx() ctx: Context) {
    return ctx.prisma.game.findMany({
      where: {
        week: { equals: searchString },
      },
    });
  }
  @Query((returns) => [Game])
  feed(@Ctx() ctx: Context) {
    return ctx.prisma.game.findMany();
  }

  @Mutation((returns) => Game)
  createGame(
    @Arg("week") week: string,
    @Arg("seasonId") seasonId: string,
    @Arg("spread") spread: number,
    @Arg("homeTeamId") homeTeamId: string,
    @Arg("awayTeamId") awayTeamId: string,
    @Arg("hasWinnerId", { nullable: true }) hasWinnerId: string,

    @Ctx() ctx: Context
  ): Promise<Game | any> {
    return ctx.prisma.game.create({
      data: {
        week: week,
        season: {
          connect: { id: seasonId },
        },
        spread: spread,
        homeTeam: {
          connect: { id: homeTeamId },
        },
        awayTeam: {
          connect: { id: awayTeamId },
        },
        hasWinner: {
          connect: { id: hasWinnerId },
        },
      },
    });
  }

  @Mutation((returns) => Game, { nullable: true })
  deleteOneGame(
    @Arg("where") where: GameIDInput,
    @Ctx() ctx: Context
  ): Promise<any> {
    return ctx.prisma.game.delete({
      where: {
        id: where.id,
      },
    });
  }
}
