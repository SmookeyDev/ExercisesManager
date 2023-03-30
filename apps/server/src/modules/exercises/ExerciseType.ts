import { connectionDefinitions } from '@entria/graphql-mongo-helpers';
import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../graphql/typeRegister';
import { ExerciseDocument } from './ExerciseModel';
import { load } from './ExerciseLoader';

export const ExerciseType = new GraphQLObjectType<ExerciseDocument>({
    name: 'Exercise',
    description: 'Exercise data',
    fields: () => ({
        id: globalIdField('Exercise'),
        _id: {
            type: GraphQLID,
            resolve: exercise => exercise._id,
        },
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
        owner: {
            type: GraphQLString,
            resolve: exercise => exercise.owner,
            ref: 'User'
        }
    }),
    interfaces: () => [nodeInterface],
});

export const ExerciseConnection = connectionDefinitions({
    name: 'ExerciseConnection',
    nodeType: ExerciseType,
});

registerTypeLoader(ExerciseType, load);