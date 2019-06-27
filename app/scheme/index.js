const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  users: [User]!
  user(id: ID!): User
  # Queries for the current user
  me: User
}

type User {
  id: ID!
  username: String,
  password: String,
  createDate: String,
  mail: String,
  type: Int,
}


type Mutation {
  createUser(
    username: String!,
    password: String!,
    mail: String!,
    type: Int!
    ): CreateUserResponse!

  login(username: String!, password: String!): LoginResponse! # login token
}

type LoginResponse {
  message: String,
  success: Boolean,
  token: String
}

type CreateUserResponse {
  # success: Boolean!
  # message: String
  user: User
}`;

module.exports = typeDefs;