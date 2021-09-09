import { DeleteUser } from './deleteUser';
import { v4 as uuid } from 'uuid';
import UserDynamoDBDataSource from '../../dataSources/user';
import CoordsDataSource from '../../dataSources/coords';

beforeEach(() => jest.clearAllMocks());

const dataSources = {
    coords: { } as CoordsDataSource,
    user: new UserDynamoDBDataSource()
};

describe('DeleteUser Unit Test', () => {
    it('should delete user from datasource', async () => {
        //Given
        const spy = jest.spyOn(dataSources.user, 'deleteItem')
            .mockImplementation(async () => { return; } );
        
        //When
        await DeleteUser(undefined, { id: uuid() }, { dataSources });
        
        //Then
        expect(spy).toHaveBeenCalledTimes(1);
    });
});