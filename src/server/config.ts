import { Config } from 'apollo-server';
import dataSources from '../graphql/dataSources';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schema';

const createConfig = (): Config => {
    return {
        dataSources,
        resolvers,
        typeDefs,
    };
};

export default createConfig;