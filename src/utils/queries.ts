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

export const VALIDATE_TOKEN = gql`
  mutation($token: String!) {
    validateToken(token: $token) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`

export const GET_TASKS = gql`
  query {
    tasks {
      _id
      todo {
        _id
        title
        description
      }
      doing {
        _id
        title
        description
      }
      done {
        _id
        title
        description
      }
    }
  }
`

export const UPDATE_TASKS = gql`
  mutation($tasks: NewTasksInput!) {
    updateTasks(tasks: $tasks) {
      _id
      author {
        _id
      }
      todo {
        _id
        title
        description
      }
      doing {
        _id
        title
        description
      }
      done {
        _id
        title
        description
      }
    }
  }
`
