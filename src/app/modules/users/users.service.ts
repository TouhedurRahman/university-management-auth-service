import config from "../../../config";
import { IUser } from "./users.interface";
import { User } from "./users.model";
import { generateUserId } from "./users.utilts";

const createUser =async (user: IUser): Promise<IUser | null> => {
    // auto generated incremental id
    const id = await generateUserId();
    user.id = id;

    // dafault password
    if(!user.password){
        user.password = config.dafault_user_pass as string;
    }

    const createdUser = await User.create(user);
    if(!createUser) {
        throw new Error('Failed to create user')
    }
    return createdUser;
}

export default {
    createUser
}