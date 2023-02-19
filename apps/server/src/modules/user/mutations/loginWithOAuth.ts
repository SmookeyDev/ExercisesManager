import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import jwt from 'jsonwebtoken';

import { UserModel } from '../UserModel';
import { verifyGoogleToken } from '../../../utils/verifyGoogleToken';
import { UserType } from '../UserType';

export const loginWithOAuth = mutationWithClientMutationId({
    name: 'LoginWithOAuth',
    inputFields: {
        id_token: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ id_token }) => {
        const { email, firstName, lastName, picture } = await verifyGoogleToken(id_token);

        if(!email) throw new Error('INVALID_GOOGLE_TOKEN');
        
        let user = await UserModel.findOne({ email });

        if (!user) user = await UserModel.create({ email, firstName, lastName, picture });
        else user = await UserModel.findOneAndUpdate({ email }, { firstName, lastName, picture }, { new: true });

        if (!user) throw new Error('USER_NOT_FOUND OR ERROR_CREATING_USER');
 
        return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    },
    outputFields: {
        token: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: async (token) => token
        }
    }
});