import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { ExerciseConnection } from '../ExerciseType';
import * as ExerciseLoader from '../ExerciseLoader';
import { connectionArgs } from 'graphql-relay';
import { withFilter } from '@entria/graphql-mongo-helpers';

export const allExercises: GraphQLFieldConfig<any, any, any> = {
    type: new GraphQLNonNull(ExerciseConnection.connectionType),
    args: {
        ...connectionArgs,
        search: {
            type: GraphQLString,
        }
    },
    resolve: async (_root, _args, context) => {
        if (!context?.user) throw new Error('USER_NOT_AUTHENTICATED');
        return ExerciseLoader.loadAll(context, withFilter(
            _args,
            _args.search ? { name: { $regex: _args.search, $options: 'i' } } : {}
        ));
    }
};