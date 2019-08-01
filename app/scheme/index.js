const { gql, AuthenticationError } = require('apollo-server');

const typeDefs = gql`
type Query {
  users: [User]!
  user(id: ID!): User
  # Queries for the current user
  me: User
  artical(id: String!): Artical
  articals(pageIndex: Int!): ArticalList
  authenticationError: String

  # category
  category: [Category]
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
  category: String,
  pre: SimpleArical,
  next: SimpleArical
}

type SimpleArical {
  id: ID,
  title: String,
}

type ArticalList {
  pageIndex: Int
  list: [Artical]
}

# category
type Category {
  value: String,
  name: String
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
    content: String,
    createDate: String!,
    category: String
  ): ArticalResponse!

  deleteArtical(
    id: String!
  ): DeleteArticalResponse!

  # category
  createCategory(
    name: String!,
    value: String!
  ):categoryResponse!

  deleteCategory(
    name: String
  ):Boolean!

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

type categoryResponse {
  name: String
  value: String
}
`;

module.exports = typeDefs;