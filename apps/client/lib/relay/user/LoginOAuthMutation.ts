import { graphql } from 'react-relay';

export const LoginOAuth = graphql`
mutation LoginOAuthMutation($token: String!) {
    loginWithOAuth(input: { token: $token }){
        me {
            id,
            name,
            email,
            picture
        }
    }
}
`