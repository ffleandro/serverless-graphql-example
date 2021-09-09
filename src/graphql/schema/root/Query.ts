export default `
  type Query {
    # User
    GetUserById(id: ID!): User!
    ListUsers(cursor: String, limit: Int, filter: String): UserList!

    # Coords
    GetCoordsByAddress(address: String): Coords!
  }
`;
