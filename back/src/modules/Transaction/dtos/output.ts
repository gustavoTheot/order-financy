import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { CategoryModel } from "../../Category/category.modul"
import { UserModel } from "../../User/user.modul"

@ObjectType()
export class TransactionOutput {
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
  category?: CategoryModel | null

  @Field(() => String, { nullable: true })
  userId?: string | null

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}

@ObjectType()
export class DeleteTransactionOutput {
  @Field(() => Boolean)
  success!: boolean
}

@ObjectType()
export class PaginatedTransactionsOutput {
  @Field(() => [TransactionOutput])
  items!: TransactionOutput[]

  @Field(() => Number)
  total!: number

  @Field(() => Number)
  page!: number

  @Field(() => Number)
  size!: number

  @Field(() => Number)
  totalPages!: number
}
