import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Player } from "./Player";

@ObjectType()
export class Season {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: false })
  year: string;

  @Field((type) => [Player], { nullable: true })
  players?: [Player] | null;
}
