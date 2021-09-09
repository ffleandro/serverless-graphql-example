import { ApolloError } from 'apollo-server-lambda';

export class UserNotFoundError extends ApolloError {
    name = 'UserNotFoundError';
    constructor(id: string) {
        super(`User not found: ${id}`, 'NOT_FOUND', undefined);
    }
}

export class GeolocationResolverError extends ApolloError {
    name = 'GeolocationResolverError';
    constructor(address: string) {
        super(`Error resolving location for address: ${address}`, 'NOT_FOUND', undefined);
    }
}