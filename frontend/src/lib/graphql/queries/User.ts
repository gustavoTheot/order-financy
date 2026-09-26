import { gql } from "@apollo/client"

export const GetUser = gql`
  query GetUser($getUserId: String!){
    getUser(id: $getUserId){
      id
      name
      email
    }
  }
`