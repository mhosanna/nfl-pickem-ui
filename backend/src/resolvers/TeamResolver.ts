import "reflect-metadata";
import { Resolver, Query, Arg, Ctx, InputType, Field } from "type-graphql";
import { Context } from "../context";
import { Team } from "../types/Team";

@InputType()
class TeamIDInput {
  @Field((type) => String)
  id: string;
}

@Resolver(Team)
export class TeamResolver {
  @Query((returns) => Team, { nullable: true })
  async team(@Arg("where") where: TeamIDInput, @Ctx() ctx: Context) {
    return ctx.prisma.team.findUnique({
      where: { id: where.id },
    });
  }

  @Query((returns) => [Team])
  teams(@Ctx() ctx: Context) {
    return ctx.prisma.team.findMany();
  }

  @Query((returns) => [Team])
  filterTeams(@Arg("searchString") searchString: string, @Ctx() ctx: Context) {
    return ctx.prisma.team.findMany({
      where: {
        OR: [
          { name: { contains: searchString } },
          { city: { contains: searchString } },
        ],
      },
    });
  }
}
