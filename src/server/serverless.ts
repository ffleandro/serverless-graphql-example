import { ApolloServer } from 'apollo-server-lambda';
import createConfig from './config';

const server = new ApolloServer(createConfig());
const handler = server.createHandler();

export { handler };