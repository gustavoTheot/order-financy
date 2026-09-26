import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"

import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutation/Category"
import type { Category } from "@/pages/category/components/CategoryCard"

export interface CategoryFormData {
  title: string
  description: string
  icon: string
  color: string
}

interface UseCategoryModalProps {
  open: boolean
  onClose: () => void
  editingCategory?: Category | null
}

export function useCategoryModal({ open, onClose, editingCategory }: UseCategoryModalProps) {
  const isEditing = !!editingCategory

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    defaultValues: {
      title: "",
      description: "",
      icon: "briefcase",
      color: "#16A34A",
    },
  })

  const selectedIcon = watch("icon")
  const selectedColor = watch("color")

  useEffect(() => {
    if (editingCategory) {
      reset({
        title: editingCategory.title,
        description: editingCategory.description || "",
        icon: editingCategory.icon || "briefcase",
        color: editingCategory.color || "#16A34A",
      })
    } else {
      reset({
        title: "",
        description: "",
        icon: "briefcase",
        color: "#16A34A",
      })
    }
  }, [editingCategory, reset, open])

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: ["ListCategorys", "ListTransactions"],
  })
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: ["ListCategorys", "ListTransactions"],
  })

  const onSubmit = async (formData: CategoryFormData) => {
    try {
      if (isEditing && editingCategory) {
        await updateCategory({
          variables: { id: editingCategory.id, data: formData },
        })
        toast.success("Categoria atualizada com sucesso!")
      } else {
        await createCategory({ variables: { data: formData } })
        toast.success("Categoria criada com sucesso!")
      }
      onClose()
    } catch (err: any) {
      toast.error(err?.message || "Erro ao salvar categoria.")
    }
  }

  return {
    isEditing,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    selectedIcon,
    selectedColor,
    onSubmit,
  }
}
