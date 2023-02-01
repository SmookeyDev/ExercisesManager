import { Variables } from "react-relay";
import axios from "axios";
import { getSession } from "next-auth/react";

interface ISession {
    user: {
        name: string;
        email: string;
        image: string;
        id_token: string;
    };
    expires: string;
}

export const fetchGraphQL = async (query: string, variables: Variables) => {
    const body = JSON.stringify({
        query,
        variables
    });

    const session = await getSession() as ISession;
    const idToken = session?.user?.id_token;

    const SERVER_URL = process.env.SERVER_URL || window.location.origin;

    const response = await axios.post(`${SERVER_URL}/graphql`, body, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": idToken
        }
    });

    return response.data;
};