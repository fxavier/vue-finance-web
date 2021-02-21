import { gql } from 'apollo-boost'

export const SignUpMutation = gql`
  mutation addUser($email: String!, $name: String!, $password: String!) {
    addUser(email: $email, name: $name, password: $password){
      user{
        id
        email
        name
        password
      }
      
    }
  }
`
