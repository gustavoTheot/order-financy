import { createParameterDecorator, ResolverData } from "type-graphql";
import { GraphqlContext } from "../context";
import { prismaClient } from "../../../prisma/prisma";
import { User } from "../../../generated/prisma/client";

export const GqlUser = () => {
  return createParameterDecorator(async({
    context
  }: ResolverData<GraphqlContext>): Promise<User | null> => {
    if (!context || !context.user) {
      return null
    }

    try{
      const user = await prismaClient.user.findUnique({
        where: {
          id: context.user
        }
      })

      if(!user) {
        throw new Error("User not found")
      }
      return user
    }catch(err){
      console.error(err)
      return null
    }
  })
}