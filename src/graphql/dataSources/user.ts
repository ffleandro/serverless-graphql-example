import { DynamoDBDataSource } from 'apollo-datasource-dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';
import { IUser, IUserList } from '../../types';
 
const TABLE_NAME = process.env.USERS_TABLE || 'serverless-graphql-example-user-dynamodb-dev';
const TABLE_KEY_SCHEMA: DocumentClient.KeySchema = [
    {
        AttributeName: 'id',
        KeyType: 'HASH',
    },
];

export default class UserDynamoDBDataSource extends DynamoDBDataSource<IUser> {
    constructor(client?: DocumentClient) {
        super(TABLE_NAME, TABLE_KEY_SCHEMA, undefined, client);
    }
 
    async getItemById(id: string): Promise<IUser|undefined> {
        const getItemInput: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            ConsistentRead: true,
            Key: { id },
        };
        return this.getItem(getItemInput);
    }

    async listPaginated(cursor?: string, limit?: number, filter?: string): Promise<IUserList> {
        const scanInput: DocumentClient.ScanInput = {
            TableName: this.tableName,
            ConsistentRead: false,
            Limit: limit ? limit : 2,
            ExclusiveStartKey: cursor ? { id: cursor } : undefined,
        };

        if (filter) {
            scanInput.FilterExpression = 'begins_with(#name, :name)';
            scanInput.ExpressionAttributeNames = { '#name': 'name' };
            scanInput.ExpressionAttributeValues = { ':name' : filter };
        }

        const scanOutput = await this.dynamoDbDocClient.scan(scanInput).promise();
        const users = scanOutput.Items as IUser[] || [];

        return {
            cursor: scanOutput.LastEvaluatedKey?.id,
            users,
        };
    }
 
    async createItem(item: Partial<IUser>): Promise<IUser> {
        const id = uuid();
        const now = new Date();
        const params: IUser = {
            id,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
            ...item,
        } as IUser;
        return this.put(params);
    }

    async updateItem(item: Partial<IUser>): Promise<IUser> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- specifying a type here would be too complex
        const updates = new Map<string, any>();
        const now = new Date().toISOString();
        const { id } = item;

        updates.set('updatedAt', now);

        if (item.name !== undefined) {
            updates.set('name', item.name);
        }

        if (item.dob !== undefined) {
            updates.set('dob', item.dob);
        }

        if (item.address !== undefined) {
            updates.set('address', item.address);
        }

        if (item.description !== undefined) {
            updates.set('description', item.description);
        }

        if (item.imageUrl !== undefined) {
            updates.set('imageUrl', item.imageUrl);
        }

        // XXX didn't like this manual way of updating a document.
        const key = { id };
        const updateExpression: DocumentClient.UpdateExpression = 'set ' + Array.from(updates.keys()).map(k => `#${k} = :${k}`).join(', ');
        const expressionAttributeValues: DocumentClient.ExpressionAttributeValueMap = { };
        const expressionAttributeNames: DocumentClient.ExpressionAttributeNameMap = { };
        for (const [key, value] of updates) {
            expressionAttributeNames[`#${key}`] = key;
            expressionAttributeValues[`:${key}`] = value;
        }

        return this.update(key, updateExpression, expressionAttributeNames, expressionAttributeValues);
    }

    async deleteItem(id: string): Promise<void> {
        return this.delete({ id });
    }
}