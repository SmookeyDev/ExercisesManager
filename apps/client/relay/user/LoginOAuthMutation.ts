import { graphql } from 'react-relay';

export const LoginOAuth = graphql`
mutation LoginOAuthMutation($id_token: String!) {
    loginWithOAuth(input: { id_token: $id_token }){
        token
    }
}
`