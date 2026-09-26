import { X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CATEGORY_ICON_OPTIONS,
  CATEGORY_COLOR_OPTIONS,
} from "@/components/CategoryIcon"

import { useCategoryModal } from "@/hooks/useCategoryModal"
import { If } from "@/components/If"
import type { Category } from "./CategoryCard"

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  editingCategory?: Category | null
}

export function CategoryModal({ open, onClose, editingCategory }: CategoryModalProps) {
  const {
    isEditing,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    selectedIcon,
    selectedColor,
    onSubmit,
  } = useCategoryModal({ open, onClose, editingCategory })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] rounded-3xl border-[#E2E8F0] p-6 shadow-xl [&>button]:hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <DialogTitle className="text-[#1A202C] text-lg font-bold">
              <If condition={isEditing} fallback="Nova categoria">
                Editar categoria
              </If>
            </DialogTitle>
            <p className="text-[#718096] text-xs mt-0.5">
              Organize suas transações com categorias
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#E2E8F0] text-[#718096] hover:bg-slate-50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title" className="text-sm font-semibold text-[#2D3748]">
              Título
            </Label>
            <Input
              id="title"
              placeholder="Ex. Alimentação"
              className="h-11 border-[#E2E8F0] rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
              {...register("title", { required: "Título é obrigatório" })}
            />
            <If condition={!!errors.title}>
              <span className="text-xs text-red-500">{errors.title?.message}</span>
            </If>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description" className="text-sm font-semibold text-[#2D3748]">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Descrição da categoria"
              className="h-11 border-[#E2E8F0] rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
              {...register("description")}
            />
            <span className="text-[11px] text-[#A0AEC0]">Opcional</span>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold text-[#2D3748]">Ícone</Label>
            <div className="grid grid-cols-8 gap-2">
              {CATEGORY_ICON_OPTIONS.map((item) => {
                const IconComponent = item.icon
                const isSelected = selectedIcon === item.value

                return (
                  <button
                    key={item.value}
                    type="button"
                    title={item.label}
                    onClick={() => setValue("icon", item.value)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-white ${
                      isSelected
                        ? "border-2 border-[#1F6F43] text-[#1F6F43]"
                        : "border border-[#E2E8F0] hover:bg-slate-50 text-[#718096]"
                    }`}
                  >
                    <IconComponent size={18} />
                  </button>
                )
              })}
            </div>
            <input type="hidden" {...register("icon", { required: true })} />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-semibold text-[#2D3748]">Cor</Label>
            <div className="grid grid-cols-7 gap-2">
              {CATEGORY_COLOR_OPTIONS.map((c) => {
                const isSelected = selectedColor === c.hex
                return (
                  <button
                    key={c.hex}
                    type="button"
                    title={c.name}
                    onClick={() => setValue("color", c.hex)}
                    className={`h-7 rounded-lg transition-all ${
                      isSelected
                        ? "ring-2 ring-offset-1 ring-[#1F6F43] border-2 border-white scale-105"
                        : "hover:opacity-90"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                )
              })}
            </div>
            <input type="hidden" {...register("color", { required: true })} />
          </div>

          <div className="pt-2 mt-1">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#1F6F43] hover:bg-[#185C37] text-white font-semibold text-base rounded-xl transition-colors shadow-xs"
            >
              <If condition={isSubmitting} fallback="Salvar">
                Salvando...
              </If>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
