import { IUser, IUserIdQueryArgs } from '../../../types';
import { IDataSources } from '../../dataSources';
import { UserNotFoundError } from '../errors';

export async function GetUserById(
    parent: undefined,
    args: IUserIdQueryArgs,
    context: { dataSources: IDataSources},
): Promise<IUser> {
    const { id } = args;
    const { user: User } = context.dataSources;

    const result = await User.getItemById(id);
    if (!result) {
        throw new UserNotFoundError(id);
    }

    return result;
}