import { GraphQLSchema } from "graphql";
import { QueryType } from './queryType';
import { MutationType } from './mutationType';

export const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});