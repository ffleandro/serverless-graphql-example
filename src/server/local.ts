import { ApolloServer } from 'apollo-server';
import createConfig from './config';

const port = process.env.PORT || 4000;

const server = new ApolloServer(createConfig());

server.listen(port)
    .then(({ url }) => console.log(`Development server running on ${url}. `));