import { ApolloServer } from 'apollo-server-lambda';
import nock from 'nock';
import { MAPBOX_URL } from '../../graphql/dataSources/coords';

import createConfig from '../../server/config';
import {
    GET_COORDS_QUERY,
    GET_COORDS_RESULT_1,
    GET_COORDS_RESULT_2,
    GET_QUERY_VARIABLES_1,
    GET_QUERY_VARIABLES_2,
    MAPBOX_RESULT_1,
    MAPBOX_RESULT_2,
    MAPBOX_RESULT_3,
} from '../mocks/coords';

describe('Coords integration test', () => {
    it('Get coordinates from address Areeiro, Loulé, Portugal', async () => {
        //Setup
        nock(MAPBOX_URL, { filteringScope: () => true })
            .filteringPath(() => '/')
            .get('/')
            .reply(200, MAPBOX_RESULT_1);

        const server = new ApolloServer(createConfig());
        const result = await server.executeOperation({
            query: GET_COORDS_QUERY,
            variables: { address: GET_QUERY_VARIABLES_1 }
        });
        
        //Create Validation
        expect(result.errors).toBeUndefined();
        expect(result.data?.coords.lat).toBe(GET_COORDS_RESULT_1.lat);
        expect(result.data?.coords.lon).toBe(GET_COORDS_RESULT_1.lon);
    });

    it('Get coordinates from address Seattle, WA', async () => {
        //Setup
        nock(MAPBOX_URL, { filteringScope: () => true })
            .filteringPath(() => '/')
            .get('/')
            .reply(200, MAPBOX_RESULT_2);

        const server = new ApolloServer(createConfig());
        const result = await server.executeOperation({
            query: GET_COORDS_QUERY,
            variables: { address: GET_QUERY_VARIABLES_2 }
        });
        
        //Create Validation
        expect(result.errors).toBeUndefined();
        expect(result.data?.coords.lat).toBe(GET_COORDS_RESULT_2.lat);
        expect(result.data?.coords.lon).toBe(GET_COORDS_RESULT_2.lon);
    });

    it('Should throw error if Mapbox response is invalid', async () => {
        //Setup
        nock(MAPBOX_URL, { filteringScope: () => true })
            .filteringPath(() => '/')
            .get('/')
            .reply(200, MAPBOX_RESULT_3);

        const server = new ApolloServer(createConfig());
        const result = await server.executeOperation({
            query: GET_COORDS_QUERY,
            variables: { address: GET_QUERY_VARIABLES_1 }
        });
        
        //Create Validation
        expect(result.errors).not.toBeUndefined();
    });
});