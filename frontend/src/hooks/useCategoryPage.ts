import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import { toast } from "sonner"

import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import { DELETE_CATEGORY } from "@/lib/graphql/mutation/Category"
import type { Category } from "@/pages/category/components/CategoryCard"

interface ListCategorysData {
  listCategorys: Category[]
}

export function useCategoryPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const { data, loading } = useQuery<ListCategorysData>(LIST_CATEGORIES, {
    fetchPolicy: "cache-and-network",
  })

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: ["ListCategorys", "ListTransactions", "CountTransactions"],
  })

  const categories = data?.listCategorys ?? []

  const totalCategories = categories.length
  const totalTransactions = categories.reduce(
    (acc, cat) => acc + (cat.transactionCount ?? cat.transactions?.length ?? 0),
    0
  )
  const mostUsed = categories.reduce<Category | null>((prev, curr) => {
    const prevCount = prev?.transactionCount ?? prev?.transactions?.length ?? 0
    const currCount = curr?.transactionCount ?? curr?.transactions?.length ?? 0
    return currCount > prevCount ? curr : prev
  }, null)

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory({ variables: { id } })
      toast.success("Categoria excluída com sucesso!")
    } catch (err: any) {
      toast.error(err?.message || "Erro ao excluir categoria.")
    }
  }

  const handleOpenCreate = () => {
    setEditingCategory(null)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingCategory(null)
  }

  return {
    categories,
    loading,
    totalCategories,
    totalTransactions,
    mostUsed,
    modalOpen,
    editingCategory,
    handleEdit,
    handleDelete,
    handleOpenCreate,
    handleCloseModal,
  }
}
