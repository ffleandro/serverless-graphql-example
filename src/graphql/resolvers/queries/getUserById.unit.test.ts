import { GET_USER_RESULT } from '../../../tests/mocks/user';
import { GetUserById } from './getUserById';
import { v4 as uuid } from 'uuid';
import UserDynamoDBDataSource from '../../dataSources/user';
import CoordsDataSource from '../../dataSources/coords';
import { UserNotFoundError } from '../errors';
import { IUser } from '../../../types';

beforeEach(() => jest.clearAllMocks());

const dataSources = {
    coords: { } as CoordsDataSource,
    user: new UserDynamoDBDataSource()
};

describe('GetUserById Unit Test', () => {
    it('should return user from datasource', async () => {
        //Given
        const expected: IUser = GET_USER_RESULT;
        const spy = jest.spyOn(dataSources.user, 'getItemById')
            .mockImplementation(async () => expected);
        
        //When
        const result = await GetUserById(undefined, { id: uuid() }, { dataSources });
        
        //Then
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expected);
    });

    it('should throw not found error', async () => {
        //Given
        jest.spyOn(dataSources.user, 'getItemById')
            .mockImplementation(async () => undefined);

        //When
        const when = () => GetUserById(undefined, { id: uuid() }, { dataSources });

        //Then
        return expect(when).rejects.toThrow(UserNotFoundError);
    });
});