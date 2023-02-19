import { GraphQLFieldConfig } from 'graphql';
import { ExerciseType } from '../ExerciseType';
import { ExerciseModel } from '../ExerciseModel';

export const ListExercises: GraphQLFieldConfig<any, any, any> = {
    type: ExerciseType,
    resolve: (_root, _args, context) => ExerciseModel.find({ owner_id: context?.user._id }),
};