import { graphql } from 'react-relay';

export const MeQuery = graphql`
query MeQuery {
    me {
        firstName,
        lastName,
        email,
        picture
    }
}
`