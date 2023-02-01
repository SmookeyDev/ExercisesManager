import { graphql } from 'react-relay';

export const MeQuery = graphql`
query MeQuery {
    me {
        name,
        email,
        picture,
        exercises {
            name,
            muscle_group,
            description,
            video_url,
            series,
            reps
        },
        trainings {
            name,
            description,
            executed_days,
            exercises {
                name,
                muscle_group,
                description,
                video_url,
                series,
                reps
            },
        },
    }
}
`