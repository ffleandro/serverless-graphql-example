import { LIST_USER_RESULT } from '../../../tests/mocks/user';
import UserDynamoDBDataSource from '../../dataSources/user';
import CoordsDataSource from '../../dataSources/coords';
import { IUserList } from '../../../types';
import { ListUsers } from './listUsers';

beforeEach(() => jest.clearAllMocks());

const dataSources = {
    coords: { } as CoordsDataSource,
    user: new UserDynamoDBDataSource()
};

describe('ListUsers Unit Test', () => {
    it('should return user list from datasource', async () => {
        //Given
        const expected: IUserList =  { cursor: undefined, users: LIST_USER_RESULT };
        
        const spy = jest.spyOn(dataSources.user, 'listPaginated')
            .mockImplementation(async () => expected);
        
        //When
        const result = await ListUsers(undefined, { }, { dataSources });
        
        //Then
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expected);
    });
});