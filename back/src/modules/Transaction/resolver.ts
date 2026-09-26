import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { TransactionModel } from "./transaction.modul";
import { CreateTransactionInput, ListTransactionsFilter, UpdateTransactionInput } from "./dtos/input";
import { TransactionOutput, DeleteTransactionOutput } from "./dtos/output";
import { TransactionService } from "./service";
import { GqlUser } from "../../graphql/decorators/user.decorator";
import { IsAuth } from "../../middlewares/auth.middleware";
import { User } from "../../../generated/prisma/client";
import { CategoryModel } from "../Category/category.modul";
import { CategoryService } from "../Category/service";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transcationService = new TransactionService();
  private categoryService = new CategoryService();

  @Mutation(() => TransactionOutput)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User
  ): Promise<TransactionOutput> {
    return this.transcationService.createTransaction(data, user.id);
  }
  
  @Mutation(() => TransactionOutput)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string,
  ): Promise<TransactionOutput> {
    return this.transcationService.updateTransaction(id, data);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    return this.transcationService.deleteTransaction(id);
  }

  @Query(() => TransactionOutput, { nullable: true })
  async getTransaction(
    @Arg('id', () => String) id: string
  ): Promise<TransactionOutput | null> {
    return this.transcationService.getTransaction(id);
  }

  @Query(() => [TransactionOutput])
  async listTransactions(
    @Arg('filter', () => ListTransactionsFilter, { nullable: true }) filter: ListTransactionsFilter,
    @GqlUser() user: User
  ): Promise<TransactionOutput[]> {
    return this.transcationService.listTransactionsPerUserId(user.id, filter);
  }

  @Query(() => Number)
  async countTransactions(
    @Arg('filter', () => ListTransactionsFilter, { nullable: true }) filter: ListTransactionsFilter,
    @GqlUser() user: User
  ): Promise<number> {
    return this.transcationService.countTransactionsPerUserId(user.id, filter);
  }
}