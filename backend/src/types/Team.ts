import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Team {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: false })
  name: string;

  @Field((type) => String, { nullable: false })
  city: string;
}
