import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { TrainingType } from '../TrainingType';
import { TrainingModel } from '../TrainingModel';
import { ExerciseInputType } from '../../exercises/ExerciseInputType';

export const CreateOrUpdateTraining = mutationWithClientMutationId({
    name: 'CreateOrUpdateTraining',
    inputFields: {
        _id: {
            type: GraphQLID
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: new GraphQLNonNull(GraphQLString)
        },
        exercises: {
            type: new GraphQLList(ExerciseInputType)
        }
    },
    mutateAndGetPayload: async ({ _id, name, description, exercises }, { user }) => {
        try{
            if (!user) throw new Error('USER_NOT_AUTHENTICATED');

            if (_id) {
                const training = await TrainingModel.findById(_id);
    
                if (!training) throw new Error('TRAINING_NOT_FOUND');
                if (training.owner.toString() !== user._id.toString()) throw new Error('USER_NOT_AUTHORIZED');
    
                const updatedTraining = await TrainingModel.findByIdAndUpdate(_id, {
                    name,
                    description,
                    exercises
                }, { new: true });
    
                return updatedTraining;
            }
    
            const newTraining = await TrainingModel.create({
                name,
                description,
                exercises,
                owner: user._id
            });
    
            return newTraining;
        }
        catch(err){
            console.log(err);
        }
    },
    outputFields: {
        training: {
            type: TrainingType,
            resolve: (training) => training
        }
    }
});

