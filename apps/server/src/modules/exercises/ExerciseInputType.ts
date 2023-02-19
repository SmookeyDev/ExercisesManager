import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLFloat
} from 'graphql';

export const ExerciseInputType = new GraphQLInputObjectType({
    name: 'ExerciseInput',
    fields: () => ({
        exercise_id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        reps: {
            type: GraphQLInt
        },
        sets: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        weight: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        rest: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    })
})