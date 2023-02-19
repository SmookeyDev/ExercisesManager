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
        id: {
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
    mutateAndGetPayload: async ({ id, name, muscle_group, description, video_url }, { user }) => {
        if (!user) throw new Error('USER_NOT_AUTHENTICATED');

        if (id) {
            const exercise = await ExerciseModel.findById(id);

            if (!exercise) throw new Error('EXERCISE_NOT_FOUND');
            if (exercise.owner_id.toString() !== user._id.toString()) throw new Error('USER_NOT_AUTHORIZED');

            const updatedExercise = await ExerciseModel.findByIdAndUpdate(id, {
                name,
                muscle_group,
                description,
                video_url
            }, { new: true });

            return updatedExercise;
        }
        
        const newExercise = await ExerciseModel.create({
            name,
            muscle_group,
            description,
            video_url,
            owner_id: user._id
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