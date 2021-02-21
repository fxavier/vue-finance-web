import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import vuelidate from '@/plugins/vuelidate'
import { errorHandler } from '@/utils'

// Apollo Imports
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false
Vue.config.errorHandler = errorHandler

export const AUTH_TOKEN = 'apollo-token'

export const resetApolloClient = async apolloClient => {
  try {
    await apolloClient.resetStore()
  } catch (err) {
    console.log('%cError on cache reset', 'color: orange;', err.message)
  }
}

export const onLogin = async (apolloClient, token) => {
  if (typeof window.localStorage !== 'undefined' && token) {
    window.localStorage.setItem(AUTH_TOKEN, token)
  }
  await resetApolloClient(apolloClient)
}

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql/'
})

const authLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext()
  operation.setContext({
    headers: {
      ...headers,
      Authorization: `JWT ${window.localStorage.getItem(AUTH_TOKEN)}`
    }
  })
  return forward(operation)
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true // process.env.NODE_ENV !== 'production'
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

new Vue({
  apolloProvider,
  store,
  router,
  vuetify,
  vuelidate,
  render: h => h(App)
}).$mount('#app')
