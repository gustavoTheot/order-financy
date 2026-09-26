import { UserRound, Mail, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSettingsForm } from "@/hooks/useSettingsForm"
import { If } from "@/components/If"

export function SettingsPage() {
  const {
    user,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    handleLogout,
    getInitials,
  } = useSettingsForm()

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-[#F7F8FA]">
      <div className="w-full max-w-[460px] bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-[#CBD5E1] text-[#475569] flex items-center justify-center font-bold text-xl select-none">
            {getInitials(user?.name)}
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-[#1A202C] text-lg font-bold">
              {user?.name || "Conta usuário"}
            </h1>
            <span className="text-[#718096] text-xs">
              {user?.email || "usuario@email.com"}
            </span>
          </div>
        </div>

        <div className="h-px bg-[#F1F5F9] -mx-8" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-sm font-semibold text-[#2D3748]">
              Nome completo
            </Label>
            <div className="relative">
              <UserRound
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
                size={16}
              />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className="pl-9 h-11 border-[#CBD5E0] rounded-xl text-sm text-[#2D3748] placeholder:text-[#A0AEC0] focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
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
            <Label htmlFor="email" className="text-sm font-semibold text-[#2D3748]">
              E-mail
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
                size={16}
              />
              <Input
                id="email"
                type="email"
                placeholder="mail@exemplo.com"
                className="pl-9 h-11 border-[#CBD5E0] rounded-xl text-sm text-[#2D3748] placeholder:text-[#A0AEC0] focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
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

          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#1F6F43] hover:bg-[#185C37] text-white font-semibold rounded-xl transition-colors shadow-xs"
            >
              <If condition={isSubmitting} fallback="Salvar alterações">
                Salvando...
              </If>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className="w-full h-11 border-[#E2E8F0] text-red-600 hover:bg-red-50 font-semibold rounded-xl gap-2 transition-colors"
            >
              <LogOut size={16} className="text-red-500" />
              Sair da conta
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
