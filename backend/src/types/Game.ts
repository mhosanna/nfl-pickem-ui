import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Season } from "./Season";
import { Team } from "./Team";

@ObjectType()
export class Game {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: false })
  week: string;

  @Field((type) => Number, { nullable: false })
  spread: number;

  @Field((type) => Season, { nullable: false })
  season: Season;

  @Field((type) => Team, { nullable: false })
  homeTeam: Team;

  @Field((type) => Team, { nullable: false })
  awayTeam: Team;

  @Field((type) => Team, { nullable: true })
  hasWinner?: Team | null;
}
