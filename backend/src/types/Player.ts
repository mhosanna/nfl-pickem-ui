import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Pick } from "./Pick";

@ObjectType()
export class Player {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: false })
  name: string;

  @Field((type) => [Pick], { nullable: true })
  picks?: [Pick] | null;
}
