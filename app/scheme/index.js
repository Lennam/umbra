const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  users: [User]!
  user(id: ID!): User
  # Queries for the current user
  me: User
  artical: User
}

type User {
  id: ID!
  username: String,
  password: String,
  createDate: String,
  mail: String,
  type: Int,
}

type Artical {
  id: ID!,
  title: String,
  content: String,
  createDate: String,
  category: [String]
}


type Mutation {
  createUser(
    username: String!,
    password: String!,
    mail: String!,
    type: Int!
    ): CreateUserResponse!

  login(username: String!, password: String!): LoginResponse! # login token

  createArtical(
    title: String!,
    content: String!,
    createDate: String!,
    category: [String]
  ): ArticalResponse!
}

# Response

type LoginResponse {
  message: String,
  success: Boolean,
  token: String
}

type CreateUserResponse {
  # success: Boolean!
  # message: String
  user: User
}

type ArticalResponse {
  title: String

}
`;

module.exports = typeDefs;