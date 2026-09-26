import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client/react"
import { toast } from "sonner"

import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from "@/lib/graphql/mutation/Transaction"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import type { Transaction } from "@/pages/transactions/components/TransactionRow"

interface CategoryItem {
  id: string
  title: string
  color: string
}

interface ListCategoriesData {
  listCategorys: CategoryItem[]
}

export interface TransactionFormData {
  description: string
  amount: number
  type: "INBOUND" | "OUTBOUND"
  categoryId?: string
  createdAt?: string
}

interface UseTransactionModalProps {
  open: boolean
  onClose: () => void
  editingTransaction?: Transaction | null
}

export function useTransactionModal({ open, onClose, editingTransaction }: UseTransactionModalProps) {
  const isEditing = !!editingTransaction

  const { data: categoriesData } = useQuery<ListCategoriesData>(LIST_CATEGORIES)
  const categories = categoriesData?.listCategorys ?? []

  const [calendarOpen, setCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [displayAmount, setDisplayAmount] = useState("R$ 0,00")
  const calendarRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    defaultValues: {
      description: "",
      amount: 0,
      type: "OUTBOUND",
      categoryId: "",
      createdAt: new Date().toISOString(),
    },
  })

  const selectedType = watch("type")

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val)
  }

  useEffect(() => {
    if (editingTransaction) {
      const d = editingTransaction.createdAt ? new Date(editingTransaction.createdAt) : new Date()
      setSelectedDate(d)
      setDisplayAmount(formatBRL(editingTransaction.amount))
      reset({
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        type: editingTransaction.type as "INBOUND" | "OUTBOUND",
        categoryId: editingTransaction.categoryId ?? "",
        createdAt: d.toISOString(),
      })
    } else {
      const d = new Date()
      setSelectedDate(d)
      setDisplayAmount("R$ 0,00")
      reset({
        description: "",
        amount: 0,
        type: "OUTBOUND",
        categoryId: "",
        createdAt: d.toISOString(),
      })
    }
  }, [editingTransaction, reset, open])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false)
      }
    }
    if (calendarOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [calendarOpen])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "")
    const numericValue = Number(rawValue) / 100
    setValue("amount", numericValue, { shouldValidate: true })
    setDisplayAmount(formatBRL(numericValue))
  }

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: ["ListTransactions", "CountTransactions", "ListCategorys"],
  })
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: ["ListTransactions", "CountTransactions", "ListCategorys"],
  })

  const onSubmit = async (formData: TransactionFormData) => {
    try {
      const payload = {
        description: formData.description,
        amount: Number(formData.amount),
        type: formData.type,
        categoryId: formData.categoryId || undefined,
        createdAt: selectedDate ? selectedDate : undefined,
      }

      if (isEditing && editingTransaction) {
        await updateTransaction({ variables: { id: editingTransaction.id, data: payload } })
        toast.success("Transação atualizada com sucesso!")
      } else {
        await createTransaction({ variables: { data: payload } })
        toast.success("Transação criada com sucesso!")
      }
      onClose()
    } catch (err: any) {
      toast.error(err?.message || "Erro ao salvar transação.")
    }
  }

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setValue("createdAt", date.toISOString())
      setCalendarOpen(false)
    }
  }

  return {
    isEditing,
    categories,
    calendarOpen,
    setCalendarOpen,
    selectedDate,
    displayAmount,
    calendarRef,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    selectedType,
    handleAmountChange,
    handleSelectDate,
    onSubmit,
  }
}
