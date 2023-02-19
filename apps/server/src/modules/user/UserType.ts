import { connectionDefinitions, connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';
import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../graphql/typeRegister';
import { UserDocument } from './UserModel';
import { load } from './UserLoader';

export const UserType = new GraphQLObjectType<UserDocument>({
    name: 'User',
    description: 'User data',
    fields: () => ({
        id: globalIdField('User'),
        firstName: {
            type: GraphQLString,
            resolve: user => user.firstName,
        },
        lastName: {
            type: GraphQLString,
            resolve: user => user.lastName,
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
        }
    }),
    interfaces: () => [nodeInterface],
});

export const UserConnection = connectionDefinitions({
    name: 'UserConnection',
    nodeType: UserType,
});

registerTypeLoader(UserType, load);