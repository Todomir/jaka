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

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`

export const SIGN_UP = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`
