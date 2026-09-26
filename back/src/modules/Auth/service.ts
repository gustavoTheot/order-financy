import { User } from "../../../generated/prisma/browser"
import { prismaClient } from "../../../prisma/prisma"
import { hashPassword, verifyPassword } from "../../util/hash"
import { signJwt } from "../../util/jwt"
import { RegisterInput } from "./dtos/input"


export class AuthService {
  async login(email: string, password: string){
    const user = await prismaClient.user.findUnique({
      where: {
        email
      }
    })

    if (!user){
      throw new Error('User not found')
    }

    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid){
      throw new Error('Invalid password')
    }

    return this.generateToken(user)
  }

  generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email
    }

    const token = signJwt(payload, "1h")
    const refreshToken = signJwt(payload, "1d")

    return { token, refreshToken, user } 
  }

  async register(data: RegisterInput){
    const existinguser = await prismaClient.user.findUnique({
      where: {
        email: data.email
      }
    })

    if(existinguser){
      throw new Error("User already exists")
    }

    const hashedPassword = await hashPassword(data.password)

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      }
    })

    return this.generateToken(user)
  }

  
}

