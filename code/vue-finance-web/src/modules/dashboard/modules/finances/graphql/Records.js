import { gql } from 'apollo-boost'

export const RecordsQuery = gql`
 query records {
   records {
      user{
        id
        name
      }
      account{
        id
        description
      }
      category{
        id
        description
      }
      amount
      recordType
      date
      description
      tags
      note
       }
 }
`
