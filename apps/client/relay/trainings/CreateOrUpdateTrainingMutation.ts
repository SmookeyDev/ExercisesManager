import { graphql } from 'react-relay';

export const CreateOrUpdateTrainingMutation = graphql`
mutation CreateOrUpdateTrainingMutation($_id: ID, $name: String!, $description: String!, $exercises: [ExerciseInput!]!) {
    CreateOrUpdateTraining(input: {
        _id: $_id,
        name: $name,
        description: $description,
        exercises: $exercises
    }) {
        training {
            _id
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