import { prismaClient } from "../../../prisma/prisma";
import { CreateUserInput, UpdateUserInput } from "./dtos/input";

export class UserService {

  async createUser(data: CreateUserInput){
    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
    return user;
  }

  async findUser(id: string){
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    })
    return user;
  }

  async updateUser(id: string, data: UpdateUserInput){
    const user = await prismaClient.user.update({
      where: {
        id
      },
      data: {
        name: data.name ?? undefined,
        email: data.email ?? undefined,
        password: data.password ?? undefined,
      }
    })
    return user;
  }
}