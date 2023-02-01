import { GraphQLObjectType } from "graphql";
import { nodeField, nodesField } from "../modules/graphql/typeRegister";
import { me } from "../modules/user/queries";

export const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        me
    })
});