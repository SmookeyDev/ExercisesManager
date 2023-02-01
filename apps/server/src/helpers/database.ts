import mongoose, { ConnectOptions } from "mongoose";
import { Logger } from "./logger";
import { MONGO_URI } from "./environment";

export const connectToDatabase = async (): Promise<void> => {
    mongoose.connection.on("connected", () => {
        Logger.info("Connected to database");
    })
        .on("error", (error) => {
            Logger.error("Error connecting to database", error);
        })
        .on("close", () => {
            Logger.info("Database connection closed");
        })

    mongoose.set("strictQuery", true);
    
    if (MONGO_URI) mongoose.connect(MONGO_URI);
    else Logger.error("No database connection string provided");
}