import { IUpdateUserArgs, IUser } from '../../../types';
import { IDataSources } from '../../dataSources';

export async function UpdateUser(
    parent: undefined,
    args: IUpdateUserArgs,
    context: { dataSources: IDataSources},
): Promise<IUser> {
    const { id, name, dob, address, description, imageUrl } = args.input;
    const dobDate = dob ? new Date(dob).toISOString().slice(0, 10) : undefined;
    const { user: User } = context.dataSources;

    const result = await User.updateItem({ id, name, dob: dobDate, address, description, imageUrl });
    return result;
}