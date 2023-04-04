import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString
} from 'graphql';
import { ExerciseType } from '../ExerciseType';
import { ExerciseModel } from '../ExerciseModel';
import { mutationWithClientMutationId } from 'graphql-relay';

export const CreateOrUpdateExercise = mutationWithClientMutationId({
    name: 'CreateOrUpdateExercise',
    inputFields: {
        _id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        muscle_group: {
            type: new GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
        video_url: {
            type: GraphQLString,
        },
    },
    mutateAndGetPayload: async ({ _id, name, muscle_group, description, video_url }, { user }) => {
        if (!user) throw new Error('USER_NOT_AUTHENTICATED');

        if (_id) {
            const exercise = await ExerciseModel.findOne({ _id: _id });

            if (!exercise) throw new Error('EXERCISE_NOT_FOUND');
            if (exercise.owner.toString() !== user._id.toString()) throw new Error('USER_NOT_AUTHORIZED');

            const updatedExercise = await ExerciseModel.updateOne({ _id: _id }, { name, muscle_group, description, video_url });
            return updatedExercise;
        }

        const newExercise = await ExerciseModel.create({
            name,
            muscle_group,
            description,
            video_url,
            owner: user._id
        });

        return newExercise;
    },
    outputFields: {
        exercise: {
            type: ExerciseType,
            resolve: (exercise) => exercise,
        },
    }
})