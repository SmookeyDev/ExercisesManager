import { UserDocument } from "../modules/user/UserModel";
import { getAllLoaders } from "../modules/graphql/loaderRegister";
import { GraphQLContext } from "../modules/graphql/types";

export const getContext = (user: UserDocument): GraphQLContext => {
    const dataloaders = getAllLoaders();

    return {
        user,
        dataloaders,
    };
}