import { CreateUser } from './createUser';
import UserDynamoDBDataSource from '../../dataSources/user';
import CoordsDataSource from '../../dataSources/coords';
import { CREATE_USER_FULL_REQUEST, CREATE_USER_SIMPLE_REQUEST } from '../../../tests/mocks/user';
import { IUser } from '../../../types';

const dataSources = {
    coords: { } as CoordsDataSource,
    user: new UserDynamoDBDataSource()
};

beforeEach(() => jest.clearAllMocks());

describe('CreateUser Unit Test', () => {
    it('should create user without optional fields in datasource', async () => {
        //Given
        const spy = jest.spyOn(dataSources.user, 'createItem')
            .mockImplementation(async (item: Partial<IUser>) => item as IUser);
        
        //When
        const result = await CreateUser(undefined, { input: CREATE_USER_SIMPLE_REQUEST }, { dataSources });
        
        //Then
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result.dob).toBe(CREATE_USER_SIMPLE_REQUEST.dob);
    });

    it('should create user with optional fields in datasource', async () => {
        //Given
        const spy = jest.spyOn(dataSources.user, 'createItem')
            .mockImplementation(async (item: Partial<IUser>) => item as IUser);
        
        //When
        const result = await CreateUser(undefined, { input: CREATE_USER_FULL_REQUEST }, { dataSources });
        
        //Then
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result.dob).toBe(CREATE_USER_FULL_REQUEST.dob);
    });
});