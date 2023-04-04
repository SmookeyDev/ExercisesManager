import {
    GraphQLID,
    GraphQLBoolean
} from 'graphql';
import { TrainingModel } from '../TrainingModel';
import { mutationWithClientMutationId } from 'graphql-relay';

export const DeleteTraining = mutationWithClientMutationId({
    name: 'DeleteTraining',
    inputFields: {
        _id: {
            type: GraphQLID,
        },
    },
    mutateAndGetPayload: async ({ _id }, { user }) => {
        if (!user) throw new Error('USER_NOT_AUTHENTICATED');

        const Training = await TrainingModel.findOne({ _id: _id });

        if (!Training) throw new Error('Training_NOT_FOUND');
        if (Training.owner.toString() !== user._id.toString()) throw new Error('USER_NOT_AUTHORIZED');

        await TrainingModel.deleteOne({ _id: _id });
        return true;
    },
    outputFields: {
        deleted: {
            type: GraphQLBoolean,
            resolve: (deleted) => deleted,
        },
    }
})