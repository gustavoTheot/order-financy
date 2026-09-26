import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "./user.modul";
import { CreateUserInput, UpdateUserInput } from "./dtos/input";
import { UserOutput } from "./dtos/output";
import { UserService } from "./service";
import { IsAuth } from "../../middlewares/auth.middleware";
import { GqlUser } from "../../graphql/decorators/user.decorator";
import { User } from "../../../generated/prisma/client";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  constructor(
    private userService = new UserService()
  ) {}

  @Mutation(() => UserOutput)
  async createUser(
    @Arg('data', () => CreateUserInput) data: CreateUserInput
  ): Promise<UserOutput> {
    const user = await this.userService.createUser(data)
    return {
      ...user,
      password: user.password ?? undefined,
    }
  }

  @Mutation(() => UserOutput)
  async updateUser(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput
  ): Promise<UserOutput> {
    const user = await this.userService.updateUser(id, data)
    return {
      ...user,
      password: user.password ?? undefined,
    }
  }

  @Query(() => UserOutput, { nullable: true })
  async me(
    @GqlUser() user: User
  ): Promise<UserOutput | null> {
    return this.userService.findUser(user.id)
  }

  @Query(() => UserOutput, { nullable: true })
  async getUser(
    @Arg('id', () => String) id: string
  ): Promise<UserOutput | null> {
    return this.userService.findUser(id)
  }
}