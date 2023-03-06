import { graphql } from 'react-relay';

export const CreateOrUpdateExerciseMutation = graphql`
mutation CreateOrUpdateExerciseMutation($id: ID, $name: String!, $muscle_group: String!, $description: String, $video_url: String) {
    CreateOrUpdateExercise(input: {
        id: $id,
        name: $name,
        muscle_group: $muscle_group,
        description: $description,
        video_url: $video_url
    }) {
        exercise {
            id
            name
            muscle_group
            description
            video_url
        }
    }
}
`;