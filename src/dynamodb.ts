import DynamoDB, { ClientConfiguration } from 'aws-sdk/clients/dynamodb';

const params: ClientConfiguration = {
    ...(process.env.IS_LOCAL && {
        endpoint: 'http://localhost:8000',
        region: 'localhost',
    }),
    ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: 'local',
    }),
};

const dynamodb = new DynamoDB.DocumentClient(params);

export default dynamodb;