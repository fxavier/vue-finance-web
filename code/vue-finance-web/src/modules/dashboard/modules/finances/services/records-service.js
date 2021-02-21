import { apolloClient } from '../../../../../main'
import { RecordsQuery } from '../graphql/Records'

const records = async variables => {
  const response = await apolloClient.query({
    query: RecordsQuery,
    variables
  })
  return response.data.records
}

export default {
  records
}
