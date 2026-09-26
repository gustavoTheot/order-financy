import { useState, useMemo } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import { toast } from "sonner"

import { LIST_TRANSACTIONS, COUNT_TRANSACTIONS } from "@/lib/graphql/queries/Transaction"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import { DELETE_TRANSACTION } from "@/lib/graphql/mutation/Transaction"

import type { Transaction, CategoryItem } from "@/pages/transactions/components/TransactionRow"

interface ListTransactionsData {
  listTransactions: Transaction[]
}

interface CountTransactionsData {
  countTransactions: number
}

interface ListCategoriesData {
  listCategorys: CategoryItem[]
}

export function useTransactionsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const totalFilter = useMemo(() => {
    const f: Record<string, any> = {}
    if (search.trim()) f.description = search.trim()
    if (typeFilter) f.type = typeFilter
    if (categoryFilter) f.categoryId = categoryFilter
    return Object.keys(f).length > 0 ? f : undefined
  }, [search, typeFilter, categoryFilter])

  const paginatedFilter = useMemo(() => {
    const f: Record<string, any> = {
      page: currentPage,
      size: itemsPerPage,
    }
    if (search.trim()) f.description = search.trim()
    if (typeFilter) f.type = typeFilter
    if (categoryFilter) f.categoryId = categoryFilter
    return f
  }, [currentPage, itemsPerPage, search, typeFilter, categoryFilter])

  const { data, loading } = useQuery<ListTransactionsData>(LIST_TRANSACTIONS, {
    variables: { filter: paginatedFilter },
    fetchPolicy: "cache-and-network",
  })

  const { data: countData } = useQuery<CountTransactionsData>(COUNT_TRANSACTIONS, {
    variables: { filter: totalFilter },
    fetchPolicy: "cache-and-network",
  })

  const { data: categoriesData } = useQuery<ListCategoriesData>(LIST_CATEGORIES, {
    fetchPolicy: "cache-and-network",
  })

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["ListTransactions", "CountTransactions", "ListCategorys"],
  })

  const transactions = data?.listTransactions ?? []
  const categories = categoriesData?.listCategorys ?? []

  const totalResults = countData?.countTransactions ?? transactions.length
  const totalPages = Math.ceil(totalResults / itemsPerPage) || 1

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction({ variables: { id } })
      toast.success("Transação excluída com sucesso!")
    } catch (err: any) {
      toast.error(err?.message || "Erro ao excluir transação.")
    }
  }

  const handleOpenCreate = () => {
    setEditingTransaction(null)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingTransaction(null)
  }

  const handleClearFilters = () => {
    setSearch("")
    setTypeFilter("")
    setCategoryFilter("")
    setCurrentPage(1)
  }

  const handleSearchChange = (val: string) => {
    setSearch(val)
    setCurrentPage(1)
  }

  const handleTypeChange = (val: string) => {
    setTypeFilter(val)
    setCurrentPage(1)
  }

  const handleCategoryChange = (val: string) => {
    setCategoryFilter(val)
    setCurrentPage(1)
  }

  return {
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
  }
}
