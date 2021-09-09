export const CREATE_USER_MUTATION = `
mutation ($input: CreateUserInput!) {
    user: CreateUser(input: $input) {
        id name dob address description imageUrl createdAt updatedAt
    }
}
`;

export const GET_USER_QUERY = `
query ($id: ID!) {
    user: GetUserById(id: $id) {
      id name dob address description imageUrl createdAt updatedAt
    }
}
`;

export const UPDATE_USER_MUTATION = `
mutation ($input: UpdateUserInput!) {
    user: UpdateUser(input: $input) {
        id name dob address description imageUrl createdAt updatedAt
    }
}
`;

export const DELETE_USER_MUTATION = `
mutation ($id: ID!) {
    id: DeleteUser(id: $id)
}
`;

export const LIST_USERS_QUERY = `
query ($cursor: String, $limit: Int, $filter: String) {
    list: ListUsers(cursor: $cursor, limit: $limit, filter: $filter) {
        cursor
        users { id name description imageUrl address }
    }
}
`;

export const GET_USER_RESULT = {
    id: 'e3a0bd6b-c045-4a13-a987-38dbb9ef59b0',
    name: 'Filipe Leandro',
    dob: '1987-07-06',
    address: 'Av. Paraiba 134, Joao Pessoa - PB',
    description: undefined,
    imageUrl: undefined,
    createdAt: '2021-08-28T01:49:24.501Z',
    updatedAt: '2021-08-28T01:49:24.501Z'
};

export const CREATE_USER_SIMPLE_REQUEST = {
    name: 'Filipe Leandro',
    dob: '1987-07-06',
    address: 'Av. Paraiba 134, Joao Pessoa - PB'
};

export const CREATE_ANOTHER_USER_SIMPLE_REQUEST = {
    name: 'John Doe',
    dob: '1997-07-06',
    address: 'Seattle, WA'
};

export const CREATE_USER_FULL_REQUEST = {
    name: 'Filipe Leandro',
    dob: '1987-07-06',
    address: 'Av. Paraiba 134, Joao Pessoa - PB',
    description: 'Hi, my name is Filipe Leandro!',
    imageUrl: 'https://my.profile.com/profilePicture'
};

export const UPDATE_USER_SIMPLE_REQUEST = {
    id: 'bae757b7-8388-4103-a82b-a8374046d149',
    description: 'Hi, my name is Filipe Leandro!',
    imageUrl: 'https://my.profile.com/profilePicture'
};

export const UPDATE_USER_FULL_REQUEST = {
    id: 'bae757b7-8388-4103-a82b-a8374046d149',
    name: 'Filipe Leandro',
    dob: '1987-07-06',
    address: 'Av. Paraiba 134, Joao Pessoa - PB',
    description: 'Hi, my name is Filipe Leandro!',
    imageUrl: 'https://my.profile.com/profilePicture'
};

export const LIST_USER_RESULT = [
    {
        id: 'e3a0bd6b-c045-4a13-a987-38dbb9ef59b0',
        name: 'Filipe Leandro',
        dob: '1987-07-06',
        address: 'Av. Paraiba 134, Joao Pessoa - PB',
        description: undefined,
        imageUrl: undefined,
        createdAt: '2021-08-28T01:49:24.501Z',
        updatedAt: '2021-08-28T01:49:24.501Z'
    },
    {
        id: 'c66e73e4-f7c0-4f8b-9a6f-f04a8bfd9e97',
        name: 'Another Person',
        dob: '1997-07-06',
        address: 'Av. Minas Gerais 1275, Recife - PE',
        description: undefined,
        imageUrl: undefined,
        createdAt: '2021-08-28T01:49:24.501Z',
        updatedAt: '2021-08-28T01:49:24.501Z'
    },
    {
        id: 'adc9fa69-4793-4c51-9e21-03d172ecb5f6',
        name: 'John Doe',
        dob: '2007-07-06',
        address: 'My Address, Seattle, WA',
        description: undefined,
        imageUrl: undefined,
        createdAt: '2021-08-28T01:49:24.501Z',
        updatedAt: '2021-08-28T01:49:24.501Z'
    }
];
