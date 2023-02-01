import { UserModel, UserDocument } from "../modules/user/UserModel";
import { verifyGoogleToken } from "./verifyGoogleToken";

export const getUser = async (token: string): Promise<UserDocument | null> => {
    const { email } = await verifyGoogleToken(token);
    if (!email) return null;

    const user = await UserModel.findOne({
        email,
    });

    if (!user) return null;
    return user;
};