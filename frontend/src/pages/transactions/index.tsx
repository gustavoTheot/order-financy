import { Plus, ChevronLeft, ChevronRight, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { If } from "@/components/If"
import { TransactionRow } from "./components/TransactionRow"
import { TransactionModal } from "./components/TransactionModal"
import { TransactionFilters } from "./components/TransactionFilters"
import { useTransactionsPage } from "@/hooks/useTransactionsPage"

export function TransactionsPage() {
  const {
    transactions,
    categories,
    loading,
    totalResults,
    totalPages,
    currentPage,
    itemsPerPage,
    search,
    typeFilter,
    categoryFilter,
    modalOpen,
    editingTransaction,
    setCurrentPage,
    handleEdit,
    handleDelete,
    handleOpenCreate,
    handleCloseModal,
    handleClearFilters,
    handleSearchChange,
    handleTypeChange,
    handleCategoryChange,
  } = useTransactionsPage()

  return (
    <div className="flex flex-col gap-8 p-6 sm:p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#1A202C] text-2xl font-bold tracking-tight">Transações</h1>
          <p className="text-[#718096] text-sm">Gerencie todas as suas transações financeiras</p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-[#1F6F43] hover:bg-[#185C37] text-white font-semibold gap-2 px-4 h-10 rounded-lg shadow-xs"
        >
          <Plus size={16} />
          Nova transação
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col shadow-xs">
        <div className="p-6 border-b border-[#F1F5F9]">
          <TransactionFilters
            search={search}
            type={typeFilter}
            categoryId={categoryFilter}
            categories={categories}
            onSearchChange={handleSearchChange}
            onTypeChange={handleTypeChange}
            onCategoryChange={handleCategoryChange}
            onClear={handleClearFilters}
          />
        </div>

        <If
          condition={loading}
          fallback={
            <If
              condition={transactions.length === 0}
              fallback={
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#F1F5F9] bg-[#FAFAFA]">
                        <th className="px-5 py-3.5 text-xs font-semibold text-[#718096] uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-4 py-3.5 text-xs font-semibold text-[#718096] uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-4 py-3.5 text-xs font-semibold text-[#718096] uppercase tracking-wider">
                          Categoria
                        </th>
                        <th className="px-4 py-3.5 text-xs font-semibold text-[#718096] uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-4 py-3.5 text-right text-xs font-semibold text-[#718096] uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-4 py-3.5 text-right text-xs font-semibold text-[#718096] uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {transactions.map((transaction) => (
                        <TransactionRow
                          key={transaction.id}
                          transaction={transaction}
                          categories={categories}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            >
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <DollarSign size={40} className="text-[#CBD5E0]" />
                <p className="text-[#A0AEC0] text-sm font-medium">Nenhuma transação encontrada</p>
                <Button
                  onClick={handleOpenCreate}
                  className="bg-[#1F6F43] hover:bg-[#185C37] text-white gap-2 mt-2 font-semibold"
                >
                  <Plus size={16} />
                  Criar primeira transação
                </Button>
              </div>
            </If>
          }
        >
          <div className="flex flex-col">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 border-b border-[#F1F5F9] animate-pulse bg-[#F8FAFC]"
              />
            ))}
          </div>
        </If>

        <If condition={!loading && totalResults > 0}>
          <div className="px-6 py-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#718096]">
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalResults)} a{" "}
              {Math.min(currentPage * itemsPerPage, totalResults)} | {totalResults} resultados
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="w-8 h-8 rounded-lg border-[#CBD5E0]"
              >
                <ChevronLeft size={16} />
              </Button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1
                const isActive = pageNum === currentPage
                return (
                  <Button
                    key={pageNum}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold ${
                      isActive
                        ? "bg-[#1F6F43] hover:bg-[#185C37] text-white border-transparent"
                        : "border-[#CBD5E0] text-[#4A5568]"
                    }`}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="w-8 h-8 rounded-lg border-[#CBD5E0]"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </If>
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={handleCloseModal}
        editingTransaction={editingTransaction}
      />
    </div>
  )
}
