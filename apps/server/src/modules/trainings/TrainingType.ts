import { connectionDefinitions, connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../graphql/typeRegister';
import { Training } from './TrainingModel';
import { load } from './TrainingLoader';

import { ExerciseType } from '../exercises/ExerciseType';
import ExerciseLoader from '../exercises/ExerciseLoader';

export const TrainingType = new GraphQLObjectType<Training>({
    name: 'Training',
    fields: () => ({
        id: globalIdField('Training'),
        name: {
            type: GraphQLString,
            resolve: training => training.name,
        },
        description: {
            type: GraphQLString,
            resolve: training => training.description,
        },
        executed_days: {
            type: GraphQLString,
            resolve: training => training.executed_days,
            
        },
        owner_id: {
            type: GraphQLString,
            resolve: training => training.owner_id
        },
        exercises: {
            type: ExerciseType,
            args: connectionArgs,
            resolve: async (user, args, context) => await ExerciseLoader.loadAll(context, withFilter(args, { owner_id: user.owner_id })),
        }
    }),
    interfaces: () => [nodeInterface],
});

export const TrainingConnection = connectionDefinitions({
    name: 'TrainingConnection',
    nodeType: TrainingType,
});

registerTypeLoader(TrainingType, load);