import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "sonner"
import { apolloClient } from "@/lib/apollo"
import { LOGIN } from "@/lib/graphql/mutation/Login"
import { REGISTER } from "@/lib/graphql/mutation/Register"

export interface SessionUser {
  id: string
  name: string
  email: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

type LoginMutationData = {
  login: {
    token: string
    refreshToken: string
    user: SessionUser
  }
}

type RegisterMutationData = {
  register: {
    token: string
    refreshToken: string
    user: SessionUser
  }
}

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: SessionUser | null
  isAuthenticated: boolean
  rememberMe: boolean
  login: (data: LoginInput, rememberMe?: boolean) => Promise<boolean>
  signup: (data: RegisterInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      rememberMe: false,

      login: async (loginData: LoginInput, rememberMe = false) => {
        try {
          const { data } = await apolloClient.mutate<LoginMutationData>({
            mutation: LOGIN,
            variables: { data: loginData },
          })

          if (data?.login) {
            const { token, refreshToken, user } = data.login
            set({
              token,
              refreshToken,
              user: { id: user.id, name: user.name, email: user.email },
              isAuthenticated: true,
              rememberMe,
            })
            toast.success("Login realizado com sucesso!")
            return true
          }
          toast.error("Erro ao realizar login. Verifique suas credenciais.")
          return false
        } catch (error: any) {
          toast.error(error?.message || "E-mail ou senha incorretos.")
          return false
        }
      },

      signup: async (registerData: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<RegisterMutationData>({
            mutation: REGISTER,
            variables: { data: registerData },
          })

          if (data?.register) {
            const { token, refreshToken, user } = data.register
            set({
              token,
              refreshToken,
              user: { id: user.id, name: user.name, email: user.email },
              isAuthenticated: true,
            })
            toast.success("Conta criada com sucesso!")
            return true
          }
          toast.error("Erro ao criar conta. Tente novamente.")
          return false
        } catch (error: any) {
          toast.error(error?.message || "Erro ao realizar cadastro.")
          return false
        }
      },

      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          rememberMe: false,
        })
        toast.info("Você saiu da conta.")
      },
    }),
    {
      name: "financy-session",
    }
  )
)

export const useSessionStore = useAuthStore
