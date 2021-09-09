import { gql } from 'apollo-server-lambda';

// Inputs
import CreateUserInput from './inputs/CreateUserInput';
import UpdateUserInput from './inputs/UpdateUserInput';
// Objects
import User from './objects/User';
import Coords from './objects/Coords';
// Root types
import Mutation from './root/Mutation'; // tslint:disable-line ordered-imports
import Query from './root/Query'; // tslint:disable-line ordered-imports

const typeDefStrings = [
    // Inputs
    CreateUserInput,
    UpdateUserInput,
    // Objects
    User,
    Coords,
    // Root types
    Mutation,
    Query,
    //Subscription, //TODO @f.leandro
];

const typeDefs = typeDefStrings.map(typeDef => gql(typeDef));

export default typeDefs;
