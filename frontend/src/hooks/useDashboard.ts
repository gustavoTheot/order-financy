import { useState, useMemo } from "react"
import { useQuery } from "@apollo/client/react"

import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction"

interface Transaction {
  id: string
  amount: number
  type: "INBOUND" | "OUTBOUND"
}

interface ListTransactionsData {
  listTransactions: Transaction[]
}

export function useDashboard() {
  const [modalOpen, setModalOpen] = useState(false)

  const { data: txData } = useQuery<ListTransactionsData>(LIST_TRANSACTIONS, {
    fetchPolicy: "cache-and-network",
  })
  const transactions = txData?.listTransactions ?? []

  const { totalInbound, totalOutbound, totalBalance } = useMemo(() => {
    let inbound = 0
    let outbound = 0
    transactions.forEach((tx) => {
      if (tx.type === "INBOUND") {
        inbound += tx.amount
      } else {
        outbound += tx.amount
      }
    })
    return {
      totalInbound: inbound,
      totalOutbound: outbound,
      totalBalance: inbound - outbound,
    }
  }, [transactions])

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return {
    modalOpen,
    setModalOpen,
    totalBalance: formatBRL(totalBalance),
    totalInbound: formatBRL(totalInbound),
    totalOutbound: formatBRL(totalOutbound),
    handleOpenModal: () => setModalOpen(true),
    handleCloseModal: () => setModalOpen(false),
  }
}
