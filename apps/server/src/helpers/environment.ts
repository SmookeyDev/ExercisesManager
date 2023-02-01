import dotenv from 'dotenv';

dotenv.config();

export const { NODE_ENV, MONGO_URI, PORT, GOOGLE_CLIENT_ID } = process.env;