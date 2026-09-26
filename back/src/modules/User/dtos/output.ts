import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}

@ObjectType()
export class DeleteUserOutput {
  @Field(() => Boolean)
  success!: boolean

  @Field(() => String, { nullable: true })
  message?: string
}
