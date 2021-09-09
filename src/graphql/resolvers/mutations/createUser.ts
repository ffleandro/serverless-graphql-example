import { ICreateUserArgs, IUser } from '../../../types';
import { IDataSources } from '../../dataSources';

export async function CreateUser(
    parent: undefined,
    args: ICreateUserArgs,
    context: { dataSources: IDataSources},
): Promise<IUser> {
    const { name, dob, address, description, imageUrl } = args.input;
    const dobDate = new Date(dob).toISOString().slice(0, 10);
    const { user: User } = context.dataSources;

    const result = await User.createItem({ name, dob: dobDate, address, description, imageUrl });
    return result;
}