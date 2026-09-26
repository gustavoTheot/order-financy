import { gql } from "@apollo/client"

export const LIST_TRANSACTIONS = gql`
  query ListTransactions($filter: ListTransactionsFilter) {
    listTransactions(filter: $filter) {
      id
      description
      amount
      type
      categoryId
      createdAt
      updatedAt
      category{
        color
        icon
        description
      }
    }
  }
`

export const COUNT_TRANSACTIONS = gql`
  query CountTransactions($filter: ListTransactionsFilter) {
    countTransactions(filter: $filter)
  }
`

export const GET_TRANSACTION = gql`
  query GetTransaction($id: String!) {
    getTransaction(id: $id) {
      id
      description
      amount
      type
      categoryId
      createdAt
      updatedAt
    }
  }
`
