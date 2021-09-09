import { UpdateUser } from './updateUser';
import UserDynamoDBDataSource from '../../dataSources/user';
import CoordsDataSource from '../../dataSources/coords';
import { CREATE_USER_SIMPLE_REQUEST, UPDATE_USER_FULL_REQUEST, UPDATE_USER_SIMPLE_REQUEST } from '../../../tests/mocks/user';
import { IUser } from '../../../types';

const dataSources = {
    coords: { } as CoordsDataSource,
    user: new UserDynamoDBDataSource()
};

beforeEach(() => jest.clearAllMocks());

describe('UpdateUser Unit Test', () => {
    it('should update user without optional fields in datasource', async () => {
        //Given
        const expected = {
            ...CREATE_USER_SIMPLE_REQUEST,
            ...UPDATE_USER_SIMPLE_REQUEST
        } as IUser;
        const spy = jest.spyOn(dataSources.user, 'updateItem')
            .mockImplementation(async () => expected);
        
        //When
        const result = await UpdateUser(undefined, { input: UPDATE_USER_SIMPLE_REQUEST }, { dataSources });
        
        //Then
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result.dob).toBe(expected.dob);
    });

    it('should update user with optional fields in datasource', async () => {
        //Given
        const spy = jest.spyOn(dataSources.user, 'updateItem')
            .mockImplementation(async (item: Partial<IUser>) => item as IUser);
        
        //When
        const result = await UpdateUser(undefined, { input: UPDATE_USER_FULL_REQUEST }, { dataSources });
        
        //Then
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result.dob).toBe(UPDATE_USER_FULL_REQUEST.dob);
    });
});