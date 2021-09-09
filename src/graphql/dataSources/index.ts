// XXX: ugly import. check https://github.com/apollographql/apollo-server/issues/1606
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import CoordsDataSource from './coords';
import UserDynamoDBDataSource from './user';
import dynamodb from '../../dynamodb';

export interface IDataSources {
    coords: CoordsDataSource;
    user: UserDynamoDBDataSource;
}

const dataSources = (): DataSources<IDataSources> => {
    return {
        coords: new CoordsDataSource(),
        user: new UserDynamoDBDataSource(dynamodb),
    };
};

export default dataSources;