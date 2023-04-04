import { graphql } from 'react-relay';

export const DeleteTrainingMutation = graphql`
mutation DeleteTrainingMutation($_id: ID) {
    DeleteTraining(input: {
        _id: $_id
    }) {
        deleted
    }
}
`;