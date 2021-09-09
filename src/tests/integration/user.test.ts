import { ApolloServer } from 'apollo-server-lambda';
import createConfig from '../../server/config';
import {
    CREATE_ANOTHER_USER_SIMPLE_REQUEST,
    CREATE_USER_MUTATION,
    CREATE_USER_SIMPLE_REQUEST,
    DELETE_USER_MUTATION,
    GET_USER_QUERY,
    LIST_USERS_QUERY,
    UPDATE_USER_FULL_REQUEST,
    UPDATE_USER_MUTATION,
    UPDATE_USER_SIMPLE_REQUEST
} from '../mocks/user';

describe('User integration test', () => {
    it('User CRUD: Create, Get, Update and Delete a User', async () => {
        //Create Setup
        const server = new ApolloServer(createConfig());
        const createResult = await server.executeOperation({
            query: CREATE_USER_MUTATION,
            variables: { input: CREATE_USER_SIMPLE_REQUEST }
        });
        
        //Create Validation
        expect(createResult.errors).toBeUndefined();
        expect(createResult.data?.user.id).not.toBeNull();
        expect(createResult.data?.user.name).toBe(CREATE_USER_SIMPLE_REQUEST.name);
        expect(createResult.data?.user.dob).toBe(CREATE_USER_SIMPLE_REQUEST.dob);
        expect(createResult.data?.user.address).toBe(CREATE_USER_SIMPLE_REQUEST.address);
        expect(createResult.data?.user.createdAt).not.toBeNull();
        expect(createResult.data?.user.updatedAt).not.toBeNull();

        const createdId = createResult.data?.user.id;

        //Get Setup
        const getResult = await server.executeOperation({
            query: GET_USER_QUERY,
            variables: { id: createdId }
        });
        
        //Get Validation
        expect(getResult.errors).toBeUndefined();
        expect(getResult.data?.user.id).toBe(createdId);
        expect(getResult.data?.user.name).toBe(CREATE_USER_SIMPLE_REQUEST.name);
        expect(getResult.data?.user.dob).toBe(CREATE_USER_SIMPLE_REQUEST.dob);
        expect(getResult.data?.user.address).toBe(CREATE_USER_SIMPLE_REQUEST.address);
        expect(getResult.data?.user.description).toBeNull();
        expect(getResult.data?.user.imageUrl).toBeNull();
        expect(getResult.data?.user.createdAt).not.toBeNull();
        expect(getResult.data?.user.updatedAt).not.toBeNull();

        //Update Setup
        const updateRequest = { ...UPDATE_USER_SIMPLE_REQUEST, id: createdId };
        const updateResult = await server.executeOperation({
            query: UPDATE_USER_MUTATION,
            variables: { input: updateRequest },
        });
        
        //Update Validation
        expect(updateResult.errors).toBeUndefined();
        expect(updateResult.data?.user.id).toBe(createdId);
        expect(updateResult.data?.user.name).toBe(CREATE_USER_SIMPLE_REQUEST.name);
        expect(updateResult.data?.user.dob).toBe(CREATE_USER_SIMPLE_REQUEST.dob);
        expect(updateResult.data?.user.address).toBe(CREATE_USER_SIMPLE_REQUEST.address);
        expect(updateResult.data?.user.description).toBe(UPDATE_USER_SIMPLE_REQUEST.description);
        expect(updateResult.data?.user.imageUrl).toBe(UPDATE_USER_SIMPLE_REQUEST.imageUrl);
        expect(updateResult.data?.user.createdAt).not.toBeNull();
        expect(updateResult.data?.user.updatedAt).not.toBeNull();

        //Delete Setup
        const deleteResult = await server.executeOperation({
            query: DELETE_USER_MUTATION,
            variables: { id: createdId }
        });

        expect(deleteResult.errors).toBeUndefined();
        expect(deleteResult.data?.id).toBe(createdId);

        //Get Not Found - Setup
        const notFoundGetResult = await server.executeOperation({
            query: GET_USER_QUERY,
            variables: { id: createdId }
        });
        
        //Get Not Found - Validation
        expect(notFoundGetResult.data).toBeNull();
        expect(notFoundGetResult.errors).not.toBeUndefined();
    });

    it('Tests create and fully update a user', async () => {
        //Create Setup
        const server = new ApolloServer(createConfig());
        const createResult = await server.executeOperation({
            query: CREATE_USER_MUTATION,
            variables: { input: CREATE_USER_SIMPLE_REQUEST }
        });
        
        //Create Validation
        expect(createResult.errors).toBeUndefined();
        expect(createResult.data?.user.id).not.toBeUndefined();
        expect(createResult.data?.user.name).toBe(CREATE_USER_SIMPLE_REQUEST.name);
        expect(createResult.data?.user.dob).toBe(CREATE_USER_SIMPLE_REQUEST.dob);
        expect(createResult.data?.user.address).toBe(CREATE_USER_SIMPLE_REQUEST.address);
        expect(createResult.data?.user.createdAt).not.toBeNull();
        expect(createResult.data?.user.updatedAt).not.toBeNull();

        const createdId = createResult.data?.user.id;

        //Update Setup
        const updateRequest = { ...UPDATE_USER_FULL_REQUEST, id: createdId };
        const updateResult = await server.executeOperation({
            query: UPDATE_USER_MUTATION,
            variables: { input: updateRequest },
        });
        
        //Update Validation
        expect(updateResult.errors).toBeUndefined();
        expect(updateResult.data?.user.id).toBe(createdId);
        expect(updateResult.data?.user.name).toBe(UPDATE_USER_FULL_REQUEST.name);
        expect(updateResult.data?.user.dob).toBe(UPDATE_USER_FULL_REQUEST.dob);
        expect(updateResult.data?.user.address).toBe(UPDATE_USER_FULL_REQUEST.address);
        expect(updateResult.data?.user.description).toBe(UPDATE_USER_FULL_REQUEST.description);
        expect(updateResult.data?.user.imageUrl).toBe(UPDATE_USER_FULL_REQUEST.imageUrl);
        expect(updateResult.data?.user.createdAt).not.toBeNull();
        expect(updateResult.data?.user.updatedAt).not.toBeNull();

        //Get Setup
        const getResult = await server.executeOperation({
            query: GET_USER_QUERY,
            variables: { id: createdId }
        });
        
        //Get Validation
        expect(getResult.errors).toBeUndefined();
        expect(getResult.data?.user.id).toBe(createdId);
        expect(getResult.data?.user.name).toBe(UPDATE_USER_FULL_REQUEST.name);
        expect(getResult.data?.user.dob).toBe(UPDATE_USER_FULL_REQUEST.dob);
        expect(getResult.data?.user.address).toBe(UPDATE_USER_FULL_REQUEST.address);
        expect(updateResult.data?.user.description).toBe(UPDATE_USER_FULL_REQUEST.description);
        expect(updateResult.data?.user.imageUrl).toBe(UPDATE_USER_FULL_REQUEST.imageUrl);
        expect(getResult.data?.user.createdAt).not.toBeNull();
        expect(getResult.data?.user.updatedAt).not.toBeNull();
    });

    it('Should test reading user list paginated', async () => {
        //Setup
        const createdIds = [];
        const server = new ApolloServer(createConfig());
        
        //Create - 1
        const createResult1 = await server.executeOperation({
            query: CREATE_USER_MUTATION,
            variables: { input: CREATE_USER_SIMPLE_REQUEST }
        });
        
        //Create Validation - 1
        expect(createResult1.errors).toBeUndefined();
        createdIds.unshift(createResult1.data?.user.id);

        //Create - 2
        const createResult2 = await server.executeOperation({
            query: CREATE_USER_MUTATION,
            variables: { input: CREATE_USER_SIMPLE_REQUEST }
        });
        
        //Create Validation - 2
        expect(createResult2.errors).toBeUndefined();
        createdIds.unshift(createResult2.data?.user.id);

        //Create - 3
        const createResult3 = await server.executeOperation({
            query: CREATE_USER_MUTATION,
            variables: { input: CREATE_USER_SIMPLE_REQUEST }
        });
        
        //Create Validation - 3
        expect(createResult3.errors).toBeUndefined();
        createdIds.unshift(createResult3.data?.user.id);

        //Create - 4
        const createResult4 = await server.executeOperation({
            query: CREATE_USER_MUTATION,
            variables: { input: CREATE_USER_SIMPLE_REQUEST }
        });
        
        //Create Validation - 4
        expect(createResult4.errors).toBeUndefined();
        createdIds.unshift(createResult4.data?.user.id);

        //List Users - Page 1
        const page1 = await server.executeOperation({
            query: LIST_USERS_QUERY,
            variables: { limit: 2 }
        });

        //Page 1 Validation
        expect(page1.errors).toBeUndefined();
        expect(page1.data?.list.cursor).not.toBeNull();
        expect(page1.data?.list.users.length).toBe(2);
        expect(createdIds).toContain(page1.data?.list.users[0].id);
        expect(createdIds).toContain(page1.data?.list.users[1].id);

        const cursor = page1.data?.list.cursor;

        //List Users - Page 2
        const page2 = await server.executeOperation({
            query: LIST_USERS_QUERY,
            variables: { cursor, limit: 100 }
        });
        
        //Page 2 Validation
        expect(page2.errors).toBeUndefined();
        expect(page2.data?.list.cursor).toBeNull();
        expect(page2.data?.list.users.length).toBe(2);
        expect(createdIds).toContain(page2.data?.list.users[0].id);
        expect(createdIds).toContain(page2.data?.list.users[1].id);
    });

    it('Should test reading user list filtered by name', async () => {
        //Setup
        const server = new ApolloServer(createConfig());
        
        //Create - 1
        const createResult1 = await server.executeOperation({
            query: CREATE_USER_MUTATION,
            variables: { input: CREATE_USER_SIMPLE_REQUEST }
        });
        
        //Create Validation - 1
        expect(createResult1.errors).toBeUndefined();
        const createdId1 = createResult1.data?.user.id;

        //Create - 2
        const createResult2 = await server.executeOperation({
            query: CREATE_USER_MUTATION,
            variables: { input: CREATE_ANOTHER_USER_SIMPLE_REQUEST }
        });
        
        //Create Validation - 2
        expect(createResult2.errors).toBeUndefined();
        const createdId2 = createResult2.data?.user.id;

        //List 1 User
        const userList1 = await server.executeOperation({
            query: LIST_USERS_QUERY,
            variables: { filter: 'Filipe' }
        });

        //List 1 Validation
        expect(userList1.errors).toBeUndefined();
        expect(userList1.data?.list.users.length).toBe(1);
        expect(userList1.data?.list.users[0].id).toBe(createdId1);
        expect(userList1.data?.list.users[0].name).toBe(CREATE_USER_SIMPLE_REQUEST.name);

        //List 2 User
        const userList2 = await server.executeOperation({
            query: LIST_USERS_QUERY,
            variables: { filter: 'John' }
        });

        //List 2 Validation
        expect(userList2.errors).toBeUndefined();
        expect(userList2.data?.list.users.length).toBe(1);
        expect(userList2.data?.list.users[0].id).toBe(createdId2);
        expect(userList2.data?.list.users[0].name).toBe(CREATE_ANOTHER_USER_SIMPLE_REQUEST.name);
    });
});