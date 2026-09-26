import { Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryIcon, getCategoryColors } from "@/components/CategoryIcon"
import { If } from "@/components/If"

export interface Category {
  id: string
  title: string
  description: string
  icon: string
  color: string
  transactionCount?: number
  transactions?: { id: string }[]
}

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const transactionCount = category.transactionCount ?? category.transactions?.length ?? 0
  const colors = getCategoryColors(category.color)

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col justify-between gap-4 hover:shadow-xs transition-shadow">
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
          style={{
            backgroundColor: colors.bgSoft,
            color: colors.textColor,
          }}
        >
          <CategoryIcon icon={category.icon} size={20} />
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(category.id)}
            className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg border border-red-100"
            title="Excluir categoria"
          >
            <Trash2 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(category)}
            className="w-8 h-8 text-[#718096] hover:text-[#1A202C] hover:bg-[#F7FAFC] rounded-lg border border-[#E2E8F0]"
            title="Editar categoria"
          >
            <Edit2 size={14} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[#1A202C] font-bold text-base">{category.title}</h3>
        <p className="text-[#718096] text-xs leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            backgroundColor: colors.bgBadge,
            color: colors.textColor,
          }}
        >
          {category.title}
        </span>
        <span className="text-xs text-[#718096]">
          {transactionCount} <If condition={transactionCount === 1} fallback="itens">item</If>
        </span>
      </div>
    </div>
  )
}
