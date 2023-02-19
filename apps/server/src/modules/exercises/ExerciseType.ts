import { connectionDefinitions } from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../graphql/typeRegister';
import { Exercise } from './ExerciseModel';
import { load } from './ExerciseLoader';

export const ExerciseType = new GraphQLObjectType<Exercise>({
    name: 'Exercise',
    description: 'Exercise data',
    fields: () => ({
        id: globalIdField('Exercise'),
        name: {
            type: GraphQLString,
            resolve: exercise => exercise.name,
        },
        muscle_group: {
            type: GraphQLString,
            resolve: exercise => exercise.muscle_group,
        },
        description: {
            type: GraphQLString,
            resolve: exercise => exercise.description,
        },
        video_url: {
            type: GraphQLString,
            resolve: exercise => exercise.video_url,
        },
        owner_id: {
            type: GraphQLString,
            resolve: exercise => exercise.owner_id,
        }
    }),
    interfaces: () => [nodeInterface],
});

export const ExerciseConnection = connectionDefinitions({
    name: 'ExerciseConnection',
    nodeType: ExerciseType,
});

registerTypeLoader(ExerciseType, load);