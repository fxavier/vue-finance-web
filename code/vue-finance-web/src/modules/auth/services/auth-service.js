import { apolloClient, onLogin } from '../../../main'
import { LoginMutation } from '../graphql/Login'
import { SignUpMutation } from '../graphql/Signup'
import { UserQuery } from '../graphql/User'

const login = async variables => {
  const response = await apolloClient.mutate({
    mutation: LoginMutation,
    variables
  })
  const { tokenAuth } = response.data
  await onLogin(apolloClient, tokenAuth.token)
  return tokenAuth
}

const signup = async variables => {
  const response = await apolloClient.mutate({
    mutation: SignUpMutation,
    variables
  })
  const { addUser } = response.data
  return addUser
}

const user = async (options = {}) => {
  const response = await apolloClient.query({
    query: UserQuery,
    ...options
  })
  const { me } = response.data
  return me
}

export default {
  login,
  signup,
  user
}
