const { gql, AuthenticationError } = require('apollo-server');

const typeDefs = gql`
type Query {
  users: [User]!
  user(id: ID!): User
  # Queries for the current user
  me: User
  artical: Artical
  articals(pageIndex: Int!): ArticalList
  authenticationError: String
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
  id: ID,
  title: String,
  content: String,
  createDate: String,
  category: [String]
}

type ArticalList {
  pageIndex: Int
  list: [Artical]
}


type Mutation {

  # User
  createUser(
    username: String!,
    password: String!,
    mail: String!,
    type: Int!
    ): CreateUserResponse!

  login(username: String!, password: String!): LoginResponse! # login token

  # Artical
  createArtical(
    title: String!,
    content: String!,
    createDate: String!,
    category: [String]
  ): ArticalResponse!

  deleteArtical(
    id: String!
  ): DeleteArticalResponse!

  # hanlde Error
  userInputError(input: String): String
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
  artical: Artical
}

type DeleteArticalResponse {
  success: Boolean
}
`;

module.exports = typeDefs;