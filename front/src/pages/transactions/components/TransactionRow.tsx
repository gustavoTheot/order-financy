import { Trash2, Edit2, ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { If } from "@/components/If"
import { CategoryIcon, getCategoryColors } from "@/components/CategoryIcon"

export interface Transaction {
  id: string
  description: string
  amount: number
  type: string
  categoryId?: string
  createdAt: string
  updatedAt?: string
}

export interface CategoryItem {
  id: string
  title: string
  color: string
  icon?: string
}

interface TransactionRowProps {
  transaction: Transaction
  categories: CategoryItem[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr)
    const day = String(d.getDate()).padStart(2, "0")
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const year = String(d.getFullYear()).slice(-2)
    return `${day}/${month}/${year}`
  } catch {
    return dateStr
  }
}

export function TransactionRow({ transaction, categories, onEdit, onDelete }: TransactionRowProps) {
  const isInbound = transaction.type === "INBOUND"
  const category = categories.find((c) => c.id === transaction.categoryId)
  const colors = getCategoryColors(category?.color)

  return (
    <tr className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors group">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
            style={{
              backgroundColor: category ? colors.bgSoft : "#F1F5F9",
              color: category ? colors.textColor : "#64748B",
            }}
          >
            <CategoryIcon icon={category?.icon} size={18} />
          </div>
          <span className="text-[#1A202C] text-sm font-semibold">{transaction.description}</span>
        </div>
      </td>

      <td className="px-4 py-4 text-sm text-[#718096]">
        {formatDate(transaction.createdAt)}
      </td>

      <td className="px-4 py-4">
        <If
          condition={category}
          fallback={<span className="text-xs text-[#A0AEC0]">—</span>}
        >
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full inline-block"
            style={{
              backgroundColor: colors.bgBadge,
              color: colors.textColor,
            }}
          >
            {category?.title}
          </span>
        </If>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <If
            condition={isInbound}
            fallback={
              <>
                <ArrowDownCircle size={16} className="text-[#EF4444]" />
                <span className="text-[#EF4444]">Saída</span>
              </>
            }
          >
            <ArrowUpCircle size={16} className="text-[#10B981]" />
            <span className="text-[#10B981]">Entrada</span>
          </If>
        </div>
      </td>

      <td className="px-4 py-4 text-right">
        <span
          className={`text-sm font-bold ${
            isInbound ? "text-[#10B981]" : "text-[#1A202C]"
          }`}
        >
          {isInbound ? "+ " : "- "}
          {formatCurrency(transaction.amount)}
        </span>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(transaction.id)}
            className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg border border-red-100"
            title="Excluir transação"
          >
            <Trash2 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(transaction)}
            className="w-8 h-8 text-[#718096] hover:text-[#1A202C] hover:bg-[#F7FAFC] rounded-lg border border-[#E2E8F0]"
            title="Editar transação"
          >
            <Edit2 size={14} />
          </Button>
        </div>
      </td>
    </tr>
  )
}
