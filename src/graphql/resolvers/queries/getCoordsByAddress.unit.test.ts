import { GetCoordsByAddress } from './getCoordsByAddress';
import UserDynamoDBDataSource from '../../dataSources/user';
import CoordsDataSource from '../../dataSources/coords';
import { GeolocationResolverError } from '../errors';
import { GET_COORDS_RESULT_1 } from '../../../tests/mocks/coords';

beforeEach(() => jest.clearAllMocks());

const dataSources = {
    coords: new CoordsDataSource(),
    user: { } as UserDynamoDBDataSource,
};

describe('GetCoordsByAddress Unit Test', () => {
    it('should return coordinates from datasource', async () => {
        //Given
        const address = 'My Address';
        const spy = jest.spyOn(dataSources.coords, 'getCoordsByAddress')
            .mockImplementation(async () => GET_COORDS_RESULT_1);
        
        //When
        const result = await GetCoordsByAddress(undefined, { address }, { dataSources });
        
        //Then
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(GET_COORDS_RESULT_1);
    });

    it('should throw geolocation resolver error', async () => {
        //Given
        const address = 'My Address';
        jest.spyOn(dataSources.coords, 'getCoordsByAddress')
            .mockImplementation(async () => undefined);

        //When
        const when = () => GetCoordsByAddress(undefined, { address }, { dataSources });

        //Then
        return expect(when).rejects.toThrow(GeolocationResolverError);
    });
});