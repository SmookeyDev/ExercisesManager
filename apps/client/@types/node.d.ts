declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            NEXTAUTH_URL: string;
            NEXTAUTH_SECRET: string;
            SERVER_URL: string;
        }
    }
    namespace NextAuth {
        interface Session {
            user?: {
                name?: string | null;
                email?: string | null;
                image?: string | null;
            };
            expires: ISODateString;
            accessToken: string;
        }
    }
}