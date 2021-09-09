export default `
  type Mutation {
    CreateUser(input: CreateUserInput!): User!
    UpdateUser(input: UpdateUserInput!): User!
    DeleteUser(id: ID!): String!
  }
`;
