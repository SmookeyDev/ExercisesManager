import { graphql } from 'react-relay';

export const DeleteExerciseMutation = graphql`
mutation DeleteExerciseMutation($_id: ID) {
    DeleteExercise(input: {
        _id: $_id
    }) {
        deleted
    }
}
`;