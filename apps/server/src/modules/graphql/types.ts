import { UserDocument } from "../user/UserModel";
import { DataLoaders } from "./loaderRegister";

export type GraphQLContext = {
    user?: UserDocument;
    dataloaders: DataLoaders;
}