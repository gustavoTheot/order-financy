import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react"

import { StatCard } from "@/pages/category/components/StatCard"
import { RecentTransactionsCard } from "./components/RecentTransactionsCard"
import { CategorySummaryCard } from "./components/CategorySummaryCard"
import { TransactionModal } from "@/pages/transactions/components/TransactionModal"
import { useDashboard } from "@/hooks/useDashboard"

export function DashboardPage() {
  const {
    modalOpen,
    totalBalance,
    totalInbound,
    totalOutbound,
    handleOpenModal,
    handleCloseModal,
  } = useDashboard()

  return (
    <div className="flex flex-col gap-8 p-6 sm:p-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Wallet size={24} />}
          value={totalBalance}
          label="SALDO TOTAL"
          iconColor="#9333EA"
        />
        <StatCard
          icon={<ArrowUpCircle size={24} />}
          value={totalInbound}
          label="RECEITAS DO MÊS"
          iconColor="#10B981"
        />
        <StatCard
          icon={<ArrowDownCircle size={24} />}
          value={totalOutbound}
          label="DESPESAS DO MÊS"
          iconColor="#EF4444"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTransactionsCard
          onOpenNewTransactionModal={handleOpenModal}
        />

        <CategorySummaryCard />
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
