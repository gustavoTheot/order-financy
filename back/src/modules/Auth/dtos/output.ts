import { Field, ObjectType } from "type-graphql"
import { UserModel } from "../../User/user.modul"

// Para entender que é uma classe de output, é preciso importar OutputType
@ObjectType()
export class RegisterOutput {
  // Para poder resolver, é preciso informar o que é e seu tipo
  @Field(() => String)
  token!: string

  @Field(() => String)
  refreshToken!: string

  @Field(() => UserModel)
  user!: UserModel
}

@ObjectType()
export class LoginOutput {
  // Para poder resolver, é preciso informar o que é e seu tipo
  @Field(() => String)
  token!: string

  @Field(() => String)
  refreshToken!: string

  @Field(() => UserModel)
  user!: UserModel
}