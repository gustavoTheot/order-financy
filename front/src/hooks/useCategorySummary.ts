import { useMemo } from "react"
import { useQuery } from "@apollo/client/react"

import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"

interface Category {
  id: string
  title: string
  description?: string
  color: string
  icon?: string
  transactionCount?: number
  transactions?: { id: string }[]
}

interface ListCategoriesData {
  listCategorys: Category[]
}

export function useCategorySummary() {
  const { data, loading } = useQuery<ListCategoriesData>(LIST_CATEGORIES, {
    fetchPolicy: "cache-and-network",
  })
  const categories = data?.listCategorys ?? []

  const categoryStats = useMemo(() => {
    return categories.map((cat) => ({
      category: cat,
      count: cat.transactionCount ?? cat.transactions?.length ?? 0,
    }))
  }, [categories])

  return {
    categories,
    categoryStats,
    loading,
  }
}
