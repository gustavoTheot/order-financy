import { Field, InputType } from "type-graphql"

// Para entender que é uma classe de input, é preciso importar InputType
@InputType()
export class RegisterInput {
  // Para poder resolver, é preciso informar o que é e seu tipo
  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}