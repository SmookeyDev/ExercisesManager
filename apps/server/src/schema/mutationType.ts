import { GraphQLObjectType } from "graphql";
import * as UserMutations from "../modules/user/mutations";

export const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        ...UserMutations
    })
});