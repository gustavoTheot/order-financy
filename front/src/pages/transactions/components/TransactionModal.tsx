import {
  X,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronDown,
  Calendar as CalendarIcon,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { If } from "@/components/If"

import { useTransactionModal } from "@/hooks/useTransactionModal"
import type { Transaction } from "./TransactionRow"

interface TransactionModalProps {
  open: boolean
  onClose: () => void
  editingTransaction?: Transaction | null
}

export function TransactionModal({ open, onClose, editingTransaction }: TransactionModalProps) {
  const {
    isEditing,
    categories,
    calendarOpen,
    setCalendarOpen,
    selectedDate,
    displayAmount,
    calendarRef,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    selectedType,
    handleAmountChange,
    handleSelectDate,
    onSubmit,
  } = useTransactionModal({ open, onClose, editingTransaction })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] rounded-3xl border-[#E2E8F0] p-6 shadow-xl [&>button]:hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <DialogTitle className="text-[#1A202C] text-lg font-bold">
              <If condition={isEditing} fallback="Nova transação">
                Editar transação
              </If>
            </DialogTitle>
            <p className="text-[#718096] text-xs mt-0.5">
              Registre sua despesa ou receita
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
          <div className="p-1 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex gap-2">
            <button
              type="button"
              onClick={() => setValue("type", "OUTBOUND")}
              className={`flex-1 h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                selectedType === "OUTBOUND"
                  ? "bg-white border-2 border-red-500 text-[#1A202C] shadow-xs"
                  : "bg-transparent text-[#718096] hover:text-[#1A202C]"
              }`}
            >
              <ArrowDownCircle
                size={18}
                className={selectedType === "OUTBOUND" ? "text-red-500" : "text-[#718096]"}
              />
              Despesa
            </button>

            <button
              type="button"
              onClick={() => setValue("type", "INBOUND")}
              className={`flex-1 h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                selectedType === "INBOUND"
                  ? "bg-white border-2 border-emerald-600 text-[#1A202C] shadow-xs"
                  : "bg-transparent text-[#718096] hover:text-[#1A202C]"
              }`}
            >
              <ArrowUpCircle
                size={18}
                className={selectedType === "INBOUND" ? "text-emerald-600" : "text-[#718096]"}
              />
              Receita
            </button>
            <input type="hidden" {...register("type")} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description" className="text-sm font-semibold text-[#2D3748]">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Ex. Almoço no restaurante"
              className="h-11 border-[#E2E8F0] rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
              {...register("description", { required: "Descrição é obrigatória" })}
            />
            <If condition={errors.description}>
              <span className="text-xs text-red-500">{errors.description?.message}</span>
            </If>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5 relative" ref={calendarRef}>
              <Label className="text-sm font-semibold text-[#2D3748]">Data</Label>
              <button
                type="button"
                onClick={() => setCalendarOpen((v) => !v)}
                className="w-full h-11 border border-[#E2E8F0] rounded-xl text-sm px-3 flex items-center justify-between bg-white text-[#2D3748] hover:border-[#CBD5E0] transition-colors"
              >
                <span className={selectedDate ? "text-[#2D3748]" : "text-[#A0AEC0]"}>
                  <If condition={selectedDate} fallback="Selecione">
                    {selectedDate && format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
                  </If>
                </span>
                <CalendarIcon size={16} className="text-[#A0AEC0]" />
              </button>

              <If condition={calendarOpen}>
                <div className="absolute top-[72px] left-0 z-50">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                  />
                </div>
              </If>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="amountDisplay" className="text-sm font-semibold text-[#2D3748]">
                Valor
              </Label>
              <Input
                id="amountDisplay"
                type="text"
                value={displayAmount}
                onChange={handleAmountChange}
                placeholder="R$ 0,00"
                className="h-11 border-[#E2E8F0] rounded-xl text-sm font-semibold text-[#2D3748] focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
              />
              <input type="hidden" {...register("amount", { required: true, min: 0.01 })} />
              <If condition={errors.amount}>
                <span className="text-xs text-red-500">Informe um valor válido</span>
              </If>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="categoryId" className="text-sm font-semibold text-[#2D3748]">
              Categoria
            </Label>
            <div className="relative">
              <select
                id="categoryId"
                {...register("categoryId")}
                className="w-full h-11 border border-[#E2E8F0] rounded-xl text-sm px-3.5 pr-10 text-[#2D3748] bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#1F6F43] focus:border-[#1F6F43]"
              >
                <option value="">Selecione</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A0AEC0] pointer-events-none"
              />
            </div>
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
