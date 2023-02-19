import { graphql } from 'react-relay';

export const CreateOrUpdateTrainingMutation = graphql`
mutation CreateOrUpdateTrainingMutation($id: ID, $name: String!, $description: String!, $exercises: [ExerciseInput!]!) {
    CreateOrUpdateTraining(input: {
        id: $id,
        name: $name,
        description: $description,
        exercises: $exercises
    }) {
        training {
            id
            name
            description
            executed_days
            exercises {
                exercise_id
                reps
                sets
                weight
                rest
                details {
                    name
                    muscle_group
                    description
                    video_url
                }
            }
        }
    }
}`