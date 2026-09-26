import { Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, UserRound, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useSignupForm } from "@/hooks/useSignupForm"
import { If } from "@/components/If"

import logoFinancy from "@/assets/logo_full.svg"

export function Signup() {
  const {
    showPassword,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  } = useSignupForm()

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F2F4F6] px-4">

      <div className="mb-6">
        <img src={logoFinancy} alt="Financy" />
      </div>

      <div className="w-full max-w-[460px] bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 flex flex-col gap-6">

        <div className="flex flex-col items-center gap-1">
          <h1 className="text-[#1A202C] text-2xl font-bold">Criar conta</h1>
          <p className="text-[#718096] text-sm">Comece a controlar suas finanças ainda hoje</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-[#2D3748]">
              Nome completo
            </Label>
            <div className="relative">
              <UserRound
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
                size={15}
              />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className="pl-9 h-11 border-[#CBD5E0] rounded-lg text-sm text-[#2D3748] placeholder:text-[#A0AEC0] focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
                {...register("name", {
                  required: "Nome é obrigatório",
                  minLength: { value: 2, message: "Nome muito curto" },
                })}
              />
            </div>
            <If condition={!!errors.name}>
              <span className="text-xs text-red-500">{errors.name?.message}</span>
            </If>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-[#2D3748]">
              E-mail
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
                size={15}
              />
              <Input
                id="email"
                type="email"
                placeholder="mail@exemplo.com"
                className="pl-9 h-11 border-[#CBD5E0] rounded-lg text-sm text-[#2D3748] placeholder:text-[#A0AEC0] focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "E-mail inválido",
                  },
                })}
              />
            </div>
            <If condition={!!errors.email}>
              <span className="text-xs text-red-500">{errors.email?.message}</span>
            </If>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-sm font-medium text-[#2D3748]">
              Senha
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
                size={15}
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="pl-9 pr-10 h-11 border-[#CBD5E0] rounded-lg text-sm text-[#2D3748] placeholder:text-[#A0AEC0] focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter no mínimo 8 caracteres",
                  },
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#718096] transition-colors"
                tabIndex={-1}
              >
                <If condition={showPassword} fallback={<Eye size={15} />}>
                  <EyeOff size={15} />
                </If>
              </button>
            </div>
            <span className={`text-xs ${errors.password ? "text-red-500" : "text-[#A0AEC0]"}`}>
              {errors.password?.message ?? "A senha deve ter no mínimo 8 caracteres"}
            </span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-[#1F6F43] hover:bg-[#185C37] text-white font-semibold rounded-lg transition-colors mt-1"
          >
            <If condition={isSubmitting} fallback="Cadastrar">
              Cadastrando...
            </If>
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <Separator className="flex-1 bg-[#E2E8F0]" />
          <span className="text-xs text-[#A0AEC0]">ou</span>
          <Separator className="flex-1 bg-[#E2E8F0]" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-[#718096]">Já tem uma conta?</p>
          <Link to="/sign" className="w-full">
            <Button
              variant="outline"
              className="w-full h-11 border-[#CBD5E0] text-[#4A5568] hover:bg-[#F7FAFC] font-medium rounded-lg gap-2"
            >
              <LogIn size={15} />
              Fazer login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}