import { graphql } from 'react-relay';

export const ListTrainingsQuery = graphql`
query ListTrainingsQuery {
    allTrainings {
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
`