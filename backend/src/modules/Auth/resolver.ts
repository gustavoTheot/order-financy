import { Arg, Mutation, Resolver } from "type-graphql";
import { AuthService } from "./service";
import { LoginInput, RegisterInput } from "./dtos/input";
import { LoginOutput, RegisterOutput } from "./dtos/output";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService = new AuthService()
  ) {}

  @Mutation(() => LoginOutput)
  async login(
    @Arg('data', () => LoginInput) data: LoginInput
  ): Promise<LoginOutput> {
    return this.authService.login(data.email, data.password)
  }

  @Mutation(() => RegisterOutput)
  async register(
    // Utiliza a typagem de inpyt do DTO
    @Arg('data', () => RegisterInput) data: RegisterInput
  ): Promise<RegisterOutput> {
    return this.authService.register(data)
  }
}