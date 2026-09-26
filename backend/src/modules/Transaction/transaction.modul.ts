import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "../User/user.modul";
import { CategoryModel } from "../Category/category.modul";

@ObjectType()
export class TransactionModel {

  @Field(() => ID)
  id!: string

  @Field(() => String)
  description!: string

  @Field(() => Number)
  amount!: number

  @Field(() => String)
  type!: string

  @Field(() => ID, { nullable: true })
  categoryId?: string | null

  @Field(() => CategoryModel, { nullable: true })
  category?: string

  @Field(() => String, { nullable: true })
  userId?: string | null

  @Field(() => UserModel, { nullable: true })
  user!: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}


