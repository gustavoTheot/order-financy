import { Field, Float, InputType } from "type-graphql";

@InputType()
export class CreateTransactionInput {

  @Field(() => String)
  description!: string

  @Field(() => Float)
  amount!: number

  @Field(() => String)
  type!: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
  
  @Field(() => String, { nullable: true })
  categoryId?: string
}

@InputType()
export class UpdateTransactionInput {

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  amount?: number

  @Field(() => String , { nullable: true })
  type?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
  
  @Field(() => String, { nullable: true })
  categoryId?: string
}

@InputType()
export class ListTransactionsFilter {

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  type?: "INBOUND" | "OUTBOUND"

  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Number, { nullable: true })
  page?: number

  @Field(() => Number, { nullable: true })
  size?: number
}