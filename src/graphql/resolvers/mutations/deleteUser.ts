import { IUserIdQueryArgs } from '../../../types';
import { IDataSources } from '../../dataSources';

export async function DeleteUser(
    parent: undefined,
    args: IUserIdQueryArgs,
    context: { dataSources: IDataSources},
): Promise<string> {
    const { id } = args;
    const { user: User } = context.dataSources;

    await User.deleteItem(id);
    return id;
}