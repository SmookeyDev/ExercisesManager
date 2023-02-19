import { GraphQLFieldConfig } from 'graphql';
import { TrainingType } from '../TrainingType';
import { TrainingModel } from '../TrainingModel';

export const ListTrainings: GraphQLFieldConfig<any, any, any> = {
    type: TrainingType,
    resolve: (_root, _args, context) => TrainingModel.find({ owner_id: context?.user._id }),
};