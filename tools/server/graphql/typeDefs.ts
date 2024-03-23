import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID
    name: String!
    score: Int
  }
  input UserInput {
    name: String!
    score: Int
  }
  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    currentNumber: Int
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
  }

  type Subscription {
    numberIncremented: Int
    allUsers: [User]
  }
`;

export default typeDefs;
