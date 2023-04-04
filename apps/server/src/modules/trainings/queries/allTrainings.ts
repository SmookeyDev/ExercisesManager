import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { TrainingConnection } from '../TrainingType';
import * as TrainingLoader from '../TrainingLoader';
import { connectionArgs } from 'graphql-relay';
import { withFilter } from '@entria/graphql-mongo-helpers';

export const allTrainings: GraphQLFieldConfig<any, any, any> = {
    type: new GraphQLNonNull(TrainingConnection.connectionType),
    args: {
        ...connectionArgs,
        search: {
            type: GraphQLString,
        }
    },
    resolve: async (_root, _args, context) => {
        if (!context?.user) throw new Error('USER_NOT_AUTHENTICATED');
        return TrainingLoader.loadAll(context, withFilter(
            _args,
            {
                ...(_args.search ? { name: { $regex: _args.search, $options: 'i' } } : {}),
                "owner": context?.user._id,
            }
        ));
    }
};