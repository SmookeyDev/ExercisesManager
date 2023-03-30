import { graphql } from 'react-relay';

export const CreateOrUpdateExerciseMutation = graphql`
mutation CreateOrUpdateExerciseMutation($_id: ID, $name: String!, $muscle_group: String!, $description: String, $video_url: String) {
    CreateOrUpdateExercise(input: {
        _id: $_id,
        name: $name,
        muscle_group: $muscle_group,
        description: $description,
        video_url: $video_url
    }) {
        exercise {
            _id
            name
            muscle_group
            description
            video_url
        }
    }
}
`;