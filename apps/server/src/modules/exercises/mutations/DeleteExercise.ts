import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';
import { ExerciseModel } from '../ExerciseModel';
import { mutationWithClientMutationId } from 'graphql-relay';

export const DeleteExercise = mutationWithClientMutationId({
    name: 'DeleteExercise',
    inputFields: {
        _id: {
            type: GraphQLID,
        },
    },
    mutateAndGetPayload: async ({ _id }, { user }) => {
        if (!user) throw new Error('USER_NOT_AUTHENTICATED');

        const exercise = await ExerciseModel.findOne({ _id: _id });

        if (!exercise) throw new Error('EXERCISE_NOT_FOUND');
        if (exercise.owner.toString() !== user._id.toString()) throw new Error('USER_NOT_AUTHORIZED');

        await ExerciseModel.deleteOne({ _id: _id });
        return true;
    },
    outputFields: {
        deleted: {
            type: GraphQLBoolean,
            resolve: (deleted) => deleted,
        },    
    }
})