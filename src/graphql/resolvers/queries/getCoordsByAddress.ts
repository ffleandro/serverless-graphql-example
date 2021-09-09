import { IAddressQueryArgs, ICoords } from '../../../types';
import { IDataSources } from '../../dataSources';
import { GeolocationResolverError } from '../errors';

export async function GetCoordsByAddress(
    parent: undefined,
    args: IAddressQueryArgs,
    context: { dataSources: IDataSources},
): Promise<ICoords> {
    const { address } = args;
    const { coords: Coords } = context.dataSources;
    
    const result = await Coords.getCoordsByAddress(address);
    if (!result) {
        throw new GeolocationResolverError(address);
    }
    return result;
}