import { gql } from "@apollo/client"

export const LIST_CATEGORIES = gql`
  query ListCategorys {
    listCategorys {
      id
      title
      description
      icon
      color
      transactionCount
      createdAt
      updatedAt
    }
  }
`

export const GET_CATEGORY = gql`
  query GetCategory($id: String!) {
    getCategory(id: $id) {
      id
      title
      description
      icon
      color
      createdAt
      updatedAt
    }
  }
`
