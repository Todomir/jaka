import gql from 'graphql-tag'

export const GET_USERS = gql`
  query {
    users {
      _id
      name
      email
    }
  }
`
