import { GraphQLObjectType } from 'graphql';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import { GraphQLContext } from './types';

type Load = (context: GraphQLContext, id: string) => any;
type TypeLoaders = {
    [key: string]: {
        type: GraphQLObjectType;
        load: Load;
    }
}

const typesLoaders: TypeLoaders = {};

export const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
    (globalId: string, context: GraphQLContext) => {
        const { type, id } = fromGlobalId(globalId);
        const { load } = typesLoaders[type] || { load: null };
        return (load && load(context, id)) || null;
    },
    (obj): any => {
        const { type } = typesLoaders[obj.constructor.name] || { type: null };
        return type;
    }
);

export const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
    typesLoaders[type.name] = {
        type,
        load,
    };

    return type;
}

export const getTypeLoader = (type: string) => typesLoaders[type];
export const getTypeLoaders = () => typesLoaders;