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
import { Season } from "../types/Season";
import { Player } from "../types/Player";

@InputType()
class NewSeasonInput {
  @Field({ nullable: false })
  year: string;
}

@Resolver(Season)
export class SeasonResolver {
  @FieldResolver()
  async players(
    @Root() season: Season,
    @Ctx() ctx: Context
  ): Promise<Player[]> {
    return ctx.prisma.season
      .findUnique({
        where: {
          id: season.id,
        },
      })
      .players();
  }

  @Mutation((returns) => Season)
  async createSeason(
    @Arg("data") data: NewSeasonInput,
    @Ctx() ctx: Context
  ): Promise<Season> {
    return ctx.prisma.season.create({
      data: {
        year: data.year,
      },
    });
  }

  @Query((returns) => Season, { nullable: true })
  async season(@Arg("id", (type) => String) id: string, @Ctx() ctx: Context) {
    return ctx.prisma.season.findUnique({
      where: { id: id },
    });
  }
}
