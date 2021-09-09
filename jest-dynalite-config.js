module.exports = {
    tables: [
        {
            TableName: 'serverless-graphql-example-user-dynamodb-dev',
            KeySchema: [{AttributeName: 'id', KeyType: 'HASH'}],
            AttributeDefinitions: [{AttributeName: 'id', AttributeType: 'S'}],
            ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1}
        }
    // etc
    ],
    region: 'localhost',
    basePort: 8000
};