const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    compositions: [Composition]!
    library: [Composition]!
    follows: [User]!
  }

  type Composition {
    _id: ID
    compositionTitle: String
    compositionText: String
    compositionAuthor: String
    tags: [String]
    createdAt: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type SearchResults {
    users: [User]
    compositions: [Composition]
  }

  input CompositionInput {
    compositionTitle: String
    compositionText: String!
    compositionAuthor: String!
    tags: [String]
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input FollowInput {
    followId: ID!
  }

  input LibraryInput {
    compositionId: ID!
  }

  type Query {
    users: [User]
    user(name: String!): User
    compositions: [Composition]!
    composition(compositionId: ID!): Composition
    me: User
    searchCompositionsAndUsers(query: String): SearchResults
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addComposition(input: CompositionInput!): Composition
    removeComposition(compositionId: ID!): Composition
    saveToLibrary(compositionId: ID!): User
    removeFromLibrary(compositionId: ID!): User
    followUser(input: FollowInput!): User
    unfollowUser(followId: ID!): User
  }
`;

export default typeDefs;
