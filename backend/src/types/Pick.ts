import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Player } from "./Player";
import { Game } from "./Game";
import { Team } from "./Team";

@ObjectType()
export class Pick {
  @Field((type) => ID)
  id: string;

  @Field((type) => Player, { nullable: false })
  player: Player;

  @Field((type) => Game, { nullable: false })
  game: Game;

  @Field((type) => Team, { nullable: false })
  team: Team;
}
