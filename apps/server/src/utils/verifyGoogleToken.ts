import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../helpers/environment";

export const verifyGoogleToken = async (token: string): Promise<any> => {
    if (!token) return {};
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    return {
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        picture: payload.picture,
    };
}