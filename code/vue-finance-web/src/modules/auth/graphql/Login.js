import { gql } from 'apollo-boost'

export const LoginMutation = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password){
      token
      payload
    }
  }
`
