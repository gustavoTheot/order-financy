import { prismaClient } from "../../../prisma/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "./dtos/input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, authorId: string) {
    const category = await prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId: authorId
      }
    });

    return category;
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    const categoryExists = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      throw new Error("Category not found");
    }

    const category = await prismaClient.category.update({
      where: { id },
      data,
    });

    return category;
  }

  async deleteCategory(id: string) {
    const category = await prismaClient.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    await prismaClient.category.update({
      where: { id },
      data: { isDeleted: true },
    });

    return true;
  }

  async getCategory(id: string) {
    const category = await prismaClient.category.findUnique({
      where: { 
        id,
        isDeleted: false
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async listCategorysPerUserId(userId: string) {
    const categories = await prismaClient.category.findMany({
      where: { 
        userId,
        isDeleted: false
      },
      include: {
        _count: {
          select: {
            transactions: {
              where: { isDeleted: false }
            }
          }
        }
      }
    });

    return categories.map((cat) => ({
      ...cat,
      transactionCount: cat._count.transactions,
    }));
  }

  async getCategoryByTransactionId(id: string) {
    const category = await prismaClient.category.findUnique({
      where: { 
        id,
        isDeleted: false
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }
}