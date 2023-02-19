import { GraphQLObjectType } from "graphql";
import * as UserMutations from "../modules/user/mutations";
import * as ExerciseMutations from "../modules/exercises/mutations";
import * as TrainingMutations from "../modules/trainings/mutations";

export const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        ...UserMutations,
        ...ExerciseMutations,
        ...TrainingMutations,
    })
});