import { GraphQLFieldConfig } from 'graphql';
import { TrainingType } from '../TrainingType';
import { TrainingModel } from '../TrainingModel';

export const allTrainings: GraphQLFieldConfig<any, any, any> = {
    type: TrainingType,
    resolve: (_root, _args, context) => TrainingModel.find({ owner: context?.user._id }),
};