import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';
import { ExerciseModel } from '../ExerciseModel';
import { TrainingModel } from '../../trainings/TrainingModel';
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
        const trainings = await TrainingModel.find({ exercises: { $elemMatch: { exercise_id: _id } } });

        for (const training of trainings) {
            const exercises = training.exercises.filter((exercise) => exercise.exercise_id.toString() !== _id.toString());
            await TrainingModel.updateOne({ _id: training._id }, { exercises });
        }

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