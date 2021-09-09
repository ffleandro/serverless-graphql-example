import { RESTDataSource } from 'apollo-datasource-rest';
import { ICoords } from '../../types';
 
export const MAPBOX_URL = 'https://api.mapbox.com';

export default class CoordsDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = MAPBOX_URL;
    }

    async getCoordsByAddress(address: string): Promise<ICoords|undefined> {
        /**
         * Mapbox API has a rate limit of 600 requests/minute and cannot be stored persistently
         * https://docs.mapbox.com/api/search/geocoding/#geocoding-restrictions-and-limits
         * 
         * If required, we can research a bit more if we can store them on a cache
         * or apply some other optimization mechanism
         */
        const apiKey = process.env.MAPBOX_KEY;
        const result = await this.get(`/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`);
        const json = JSON.parse(result);
        const location: Array<number> | undefined = json.features[0]?.center;

        if (!location || location.length != 2 || !location[0] || !location[1]) {
            return undefined;
        }

        return {
            lat: location[1],
            lon: location[0]
        };
    }
}