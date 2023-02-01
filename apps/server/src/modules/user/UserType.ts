import { connectionDefinitions, connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../graphql/typeRegister';
import { UserDocument } from './UserModel';
import { load } from './UserLoader';

import { ExerciseType } from '../exercises/ExerciseType';
import ExerciseLoader from '../exercises/ExerciseLoader';
import { TrainingType } from '../trainings/TrainingType';
import TrainingLoader from '../trainings/TrainingLoader';

export const UserType = new GraphQLObjectType<UserDocument>({
    name: 'User',
    description: 'User data',
    fields: () => ({
        id: globalIdField('User'),
        name: {
            type: GraphQLString,
            resolve: user => user.name,
        },
        email: {
            type: GraphQLString,
            resolve: user => user.email,
        },
        picture: {
            type: GraphQLString,
            resolve: user => user.picture,
        },
        provider: {
            type: GraphQLString,
            resolve: user => user.provider,
        },
        exercises: {
            type: ExerciseType,
            args: { ...connectionArgs },
            resolve: async (user, args, context) => await ExerciseLoader.loadAll(context, withFilter(args, { owner_id: user._id })),
        },
        trainings: {
            type: TrainingType,
            args: { ...connectionArgs },
            resolve: async (user, args, context) => await TrainingLoader.loadAll(context, withFilter(args, { owner_id: user._id })),
        }
    }),
    interfaces: () => [nodeInterface],
});

export const UserConnection = connectionDefinitions({
    name: 'UserConnection',
    nodeType: UserType,
});

registerTypeLoader(UserType, load);