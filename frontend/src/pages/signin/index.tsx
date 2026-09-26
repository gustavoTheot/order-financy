import { Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useSignForm } from "@/hooks/useSignForm"
import { If } from "@/components/If"

import logoFinancy from "@/assets/logo_full.svg"

export function Sign() {
  const {
    showPassword,
    rememberMe,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  } = useSignForm()

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F2F4F6] px-4">

      <div className="mb-6">
        <img src={logoFinancy} alt="Financy" />
      </div>

      <div className="w-full max-w-[460px] bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 flex flex-col gap-6">

        <div className="flex flex-col items-center gap-1">
          <h1 className="text-[#1A202C] text-2xl font-bold">Fazer login</h1>
          <p className="text-[#718096] text-sm">Entre na sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            <If condition={!!errors.password}>
              <span className="text-xs text-red-500">{errors.password?.message}</span>
            </If>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
                className="h-4 w-4 rounded border-[#CBD5E0] data-[state=checked]:bg-[#1F6F43] data-[state=checked]:border-[#1F6F43]"
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm text-[#4A5568] cursor-pointer"
              >
                Lembrar-me
              </Label>
            </div>
            <button
              type="button"
              className="text-sm text-[#1F6F43] hover:underline font-medium"
            >
              Recuperar senha
            </button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-[#1F6F43] hover:bg-[#185C37] text-white font-semibold rounded-lg transition-colors mt-1"
          >
            <If condition={isSubmitting} fallback="Entrar">
              Entrando...
            </If>
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <Separator className="flex-1 bg-[#E2E8F0]" />
          <span className="text-xs text-[#A0AEC0]">ou</span>
          <Separator className="flex-1 bg-[#E2E8F0]" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-[#718096]">Ainda não tem uma conta?</p>
          <Link to="/signup" className="w-full">
            <Button
              variant="outline"
              className="w-full h-11 border-[#CBD5E0] text-[#4A5568] hover:bg-[#F7FAFC] font-medium rounded-lg gap-2"
            >
              <UserPlus size={15} />
              Criar conta
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}