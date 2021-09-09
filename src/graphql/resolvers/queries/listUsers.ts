import { IUserList, IUserListQueryArgs } from '../../../types';
import { IDataSources } from '../../dataSources';

export async function ListUsers(
    parent: undefined,
    args: IUserListQueryArgs,
    context: { dataSources: IDataSources},
): Promise<IUserList> {
    const { cursor, limit, filter } = args;
    const { user: User } = context.dataSources;

    const result = await User.listPaginated(cursor, limit, filter);
    return result;
}