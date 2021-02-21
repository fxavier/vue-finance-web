import { gql } from 'apollo-boost'

export const UserQuery = gql`
  query user {
    me {
      id
      name
      email
      password
    }
  }
`
