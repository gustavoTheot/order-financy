import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { TransactionModel } from "../Transaction/transaction.modul";
import { UserModel } from "../User/user.modul";

@ObjectType()
export class CategoryModel {

  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String)
  description!: string

  @Field(() => String)
  icon!: string

  @Field(() => String, { nullable: true })
  color?: string | null

  @Field(() => Boolean, { nullable: true })
  isDeleted?: boolean

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => Number, { nullable: true })
  transactionCount?: number;

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[];

  @Field(() => String, { nullable: true })
  userId?: string | null

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
}


