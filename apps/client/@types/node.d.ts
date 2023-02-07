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
}