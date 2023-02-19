import { graphql } from 'react-relay';

export const ListExercisesQuery = graphql`
query ListExercisesQuery {
    ListExercises {
        id
        name
        muscle_group
        description
        video_url
    }
}
`;