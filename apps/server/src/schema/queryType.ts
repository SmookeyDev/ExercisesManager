import { GraphQLObjectType } from "graphql";
import { nodeField, nodesField } from "../modules/graphql/typeRegister";
import * as UserQueries from "../modules/user/queries";
import * as ExerciseQueries from "../modules/exercises/queries";
import * as TrainingQueries from "../modules/trainings/queries";

export const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        ...UserQueries,
        ...ExerciseQueries,
        ...TrainingQueries,
    })
});