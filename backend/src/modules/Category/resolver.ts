import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { GqlUser } from "../../graphql/decorators/user.decorator";
import { IsAuth } from "../../middlewares/auth.middleware";
import { User } from "../../../generated/prisma/client";
import { CategoryModel } from "./category.modul";
import { CreateCategoryInput, UpdateCategoryInput } from "./dtos/input";
import { CategoryOutput, DeleteCategoryOutput } from "./dtos/output";
import { CategoryService } from "./service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();

  @Mutation(() => CategoryOutput)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User
  ): Promise<CategoryOutput> {
    return this.categoryService.createCategory(data, user.id);
  }
  
  @Mutation(() => CategoryOutput)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg('id', () => String) id: string,
  ): Promise<CategoryOutput> {
    return this.categoryService.updateCategory(id, data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }

  @Query(() => CategoryOutput)
  async getCategory(
    @Arg('id', () => String) id: string
  ): Promise<CategoryOutput> {
    return this.categoryService.getCategory(id);
  }

  @Query(() => [CategoryOutput])
  async listCategorys(
    @GqlUser() user: User
  ): Promise<CategoryOutput[]> {
    return this.categoryService.listCategorysPerUserId(user.id);
  }
}