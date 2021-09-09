export default `
  type User {
    id: ID!
    name: String!
    dob: String!
    address: String!
    description: String
    imageUrl: String
    createdAt: String!
    updatedAt: String!
  }

  type UserList {
    # cursor specifies the place in the list where we left off
    cursor: String

    # this is a chunk of users to be returned
    users: [User]!
  }
`;

