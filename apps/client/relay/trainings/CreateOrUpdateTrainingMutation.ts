import { graphql } from 'react-relay';

export const CreateOrUpdateTrainingMutation = graphql`
mutation CreateOrUpdateTrainingMutation($_id: ID, $name: String!, $exercises: [ExerciseInput!]!) {
    CreateOrUpdateTraining(input: {
        _id: $_id,
        name: $name,
        exercises: $exercises
    }) {
        training {
            _id
            name
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