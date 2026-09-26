import { Link } from "react-router-dom"
import { ChevronRight, Tag } from "lucide-react"

import { getCategoryColors } from "@/components/CategoryIcon"
import { useCategorySummary } from "@/hooks/useCategorySummary"
import { If } from "@/components/If"

export function CategorySummaryCard() {
  const { categories, categoryStats, loading } = useCategorySummary()

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] p-6 flex flex-col justify-between shadow-xs">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F4F8]">
          <span className="text-xs font-bold text-[#718096] uppercase tracking-wider">
            CATEGORIAS
          </span>
          <Link
            to="/categories"
            className="text-xs font-bold text-[#1F6F43] hover:underline flex items-center gap-1"
          >
            Gerenciar <ChevronRight size={14} />
          </Link>
        </div>

        <If
          condition={loading}
          fallback={
            <If
              condition={categories.length === 0}
              fallback={
                <div className="divide-y divide-[#F0F4F8] my-2">
                  {categoryStats.map(({ category, count }) => {
                    const colors = getCategoryColors(category.color)
                    return (
                      <div
                        key={category.id}
                        className="flex items-center justify-between py-3.5 hover:bg-[#F8FAFC] px-1 rounded-lg transition-colors"
                      >
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
                          {count} <If condition={count === 1} fallback="itens">item</If>
                        </span>
                      </div>
                    )
                  })}
                </div>
              }
            >
              <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
                <Tag size={32} className="text-[#CBD5E0]" />
                <p className="text-[#A0AEC0] text-sm font-medium">Nenhuma categoria criada.</p>
                <Link
                  to="/categories"
                  className="text-xs text-[#1F6F43] font-bold hover:underline mt-1"
                >
                  + Criar categoria
                </Link>
              </div>
            </If>
          }
        >
          <div className="flex flex-col gap-3 py-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </If>
      </div>
    </div>
  )
}
