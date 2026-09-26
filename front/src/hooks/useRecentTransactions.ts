import { useMemo } from "react"
import { useQuery } from "@apollo/client/react"

import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction"

interface Category {
  color?: string
  icon?: string
  title?: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: "INBOUND" | "OUTBOUND"
  categoryId?: string
  createdAt: string
  updatedAt: string
  category?: Category
}

interface ListTransactionsData {
  listTransactions: Transaction[]
}

export function useRecentTransactions() {
  const { data, loading } = useQuery<ListTransactionsData>(LIST_TRANSACTIONS, {
    fetchPolicy: "cache-and-network",
  })
  const transactions = data?.listTransactions ?? []

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [transactions])

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
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

  return {
    recentTransactions,
    loading,
    formatBRL,
    formatDate,
  }
}
