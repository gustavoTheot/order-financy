import { Link } from "react-router-dom"
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
  ChevronRight,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CategoryIcon, getCategoryColors } from "@/components/CategoryIcon"
import { useRecentTransactions } from "@/hooks/useRecentTransactions"
import { If } from "@/components/If"

interface RecentTransactionsCardProps {
  onOpenNewTransactionModal: () => void
}

export function RecentTransactionsCard({ onOpenNewTransactionModal }: RecentTransactionsCardProps) {
  const { recentTransactions, loading, formatBRL, formatDate } = useRecentTransactions()

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 flex flex-col justify-between shadow-xs">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F4F8]">
          <span className="text-xs font-bold text-[#718096] uppercase tracking-wider">
            TRANSAÇÕES RECENTES
          </span>
          <Link
            to="/transactions"
            className="text-xs font-bold text-[#1F6F43] hover:underline flex items-center gap-1"
          >
            Ver todas <ChevronRight size={14} />
          </Link>
        </div>

        <If
          condition={loading}
          fallback={
            <If
              condition={recentTransactions.length === 0}
              fallback={
                <div className="divide-y divide-[#F0F4F8]">
                  {recentTransactions.map((tx) => {
                    const category = tx.category
                    const isInbound = tx.type === "INBOUND"
                    const colors = getCategoryColors(category?.color)

                    return (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between py-4 hover:bg-[#F8FAFC] px-2 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: category ? colors.bgSoft : "#F1F5F9",
                              color: category ? colors.textColor : "#64748B",
                            }}
                          >
                            <CategoryIcon icon={category?.icon} size={20} />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#1A202C]">
                              {tx.description}
                            </span>
                            <span className="text-xs text-[#718096]">
                              {formatDate(tx.createdAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <If
                            condition={!!category}
                            fallback={
                              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 hidden sm:inline-block">
                                <If condition={isInbound} fallback="Despesa">
                                  Receita
                                </If>
                              </span>
                            }
                          >
                            <span
                              className="text-xs font-semibold px-3 py-1 rounded-full hidden sm:inline-block"
                              style={{
                                backgroundColor: colors.bgBadge,
                                color: colors.textColor,
                              }}
                            >
                              {category?.title || "Categoria"}
                            </span>
                          </If>

                          <div className="flex items-center gap-1.5 min-w-[110px] justify-end">
                            <span className="text-sm font-bold text-[#1A202C]">
                              <If condition={isInbound} fallback="- ">
                                +{" "}
                              </If>
                              {formatBRL(tx.amount)}
                            </span>
                            <If
                              condition={isInbound}
                              fallback={<ArrowDownCircle size={16} className="text-[#EF4444] shrink-0" />}
                            >
                              <ArrowUpCircle size={16} className="text-[#10B981] shrink-0" />
                            </If>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              }
            >
              <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                <TrendingUp size={36} className="text-[#CBD5E0]" />
                <p className="text-[#A0AEC0] text-sm font-medium">Nenhuma transação registrada ainda.</p>
                <Button
                  onClick={onOpenNewTransactionModal}
                  className="bg-[#1F6F43] hover:bg-[#185C37] text-white text-xs font-semibold gap-1.5 mt-1"
                >
                  <Plus size={14} /> Registrar primeira transação
                </Button>
              </div>
            </If>
          }
        >
          <div className="flex flex-col gap-3 py-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </If>
      </div>

      <div className="pt-4 border-t border-[#F0F4F8] mt-4 flex justify-center">
        <button
          onClick={onOpenNewTransactionModal}
          className="text-[#1F6F43] hover:text-[#185C37] font-semibold text-sm flex items-center gap-1.5 transition-colors"
        >
          <Plus size={16} /> Nova transação
        </button>
      </div>
    </div>
  )
}
