import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { UserModel } from '../UserModel';
import { UserType } from '../UserType';

import { verifyGoogleToken } from '../../../utils/verifyGoogleToken';

export const loginWithOAuth = mutationWithClientMutationId({
    name: 'LoginWithOAuth',
    inputFields: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ token }) => {
        const { email, name, picture } = await verifyGoogleToken(token);
        let user = await UserModel.findOne({ email })

        if (!user) user = await UserModel.create({ email, name, picture });
        else user = await UserModel.findOneAndUpdate({ email }, { name, picture }, { new: true });

        return {
            id: user?._id,
            token
        };
    },
    outputFields: {
        me: {
            type: UserType,
            resolve: async ({ id }) => await UserModel.findById(id),
        }
    }
});