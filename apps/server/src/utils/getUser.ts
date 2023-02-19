import { UserModel, UserDocument } from "../modules/user/UserModel";
import jwt from "jsonwebtoken";

interface DecodedToken {
    email: string;
    iat: number;
    exp: number;
}

export const getUser = async (token: string): Promise<UserDocument | null> => {
    if (!token) return null;

    const response: any = jwt.verify(token, process.env.JWT_SECRET, async (err, decoded: DecodedToken) => {
        if (err) throw new Error("SESSION_EXPIRED OR INVALID_TOKEN");

        const user = await UserModel.findOne({
            email: decoded?.email,
        });

        if (!user) throw new Error("USER_NOT_FOUND");
        return user;
    });

    return response;
};