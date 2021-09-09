import * as queries from './queries';
import * as mutations from './mutations';

const resolvers = {
    Mutation: mutations,
    Query: queries,
};

export default resolvers;