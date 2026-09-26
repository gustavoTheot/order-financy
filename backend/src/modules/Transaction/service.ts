import { prismaClient } from "../../../prisma/prisma";
import { CreateTransactionInput, ListTransactionsFilter, UpdateTransactionInput } from "./dtos/input";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, authorId: string) {
    const transaction = await prismaClient.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        categoryId: data.categoryId,
        userId: authorId
      }
    });

    return transaction;
  }

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    const transactionExists = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transactionExists) {
      throw new Error("Transaction not found");
    }

    const transaction = await prismaClient.transaction.update({
      where: { id },
      data,
    });

    return transaction;
  }

  async deleteTransaction(id: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    await prismaClient.transaction.update({
      where: { id },
      data: { isDeleted: true },
    });

    return true;
  }

  async getTransaction(id: string) {
    const transactionExists = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transactionExists) {
      throw new Error("Transaction not found");
    }

    const transaction = await prismaClient.transaction.findUnique({
      where: { 
        id,  
        isDeleted: false
      },
    });

    return transaction;
  }

  async listTransactionsPerUserId(userId: string, filter: ListTransactionsFilter = {}) {
    const { description, type, categoryId, createdAt, page = 1, size = 10 } = filter;

    const currentPage = page || 1;
    const currentSize = size || 10;

    const skip = (currentPage - 1) * currentSize;
    const take = currentSize;
    
    const filterCategory = categoryId ? { 
      id: categoryId, 
      isDeleted: false 
    } : undefined;

    const transactions = await prismaClient.transaction.findMany({
      where: { 
        userId,
        description: description ? { contains: description } : undefined,
        type: type || undefined,
        categoryId: categoryId || undefined,
        category: filterCategory,
        isDeleted: false,
        createdAt: createdAt ? { gte: createdAt } : undefined,
      },
      include: {
        category: true,
      },
      skip,
      take
    });

    return transactions;
  }

  async countTransactionsPerUserId(userId: string, filter: ListTransactionsFilter = {}) {
    const { description, type, categoryId, createdAt } = filter;

    const filterCategory = categoryId ? { 
      id: categoryId, 
      isDeleted: false 
    } : undefined;

    return prismaClient.transaction.count({
      where: { 
        userId,
        description: description ? { contains: description } : undefined,
        type: type || undefined,
        categoryId: categoryId || undefined,
        category: filterCategory,
        isDeleted: false,
        createdAt: createdAt ? { gte: createdAt } : undefined,
      },
    });
  }
}