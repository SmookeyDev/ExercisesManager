import { graphql } from "react-relay";

export const AllTrainingsPaginationFragment = graphql`
  fragment AllTrainingsPagination on Query
  @argumentDefinitions(first: { type: Int, defaultValue: 15 }, after: { type: String }, search: { type: String })
  @refetchable(queryName: "AllTrainingsManagerPaginationQuery") {
    allTrainings(first: $first, after: $after, search: $search)
      @connection(key: "trainings_allTrainings", filters: ["search"]) {
      endCursorOffset
      startCursorOffset
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
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
                details{
                    name,
                    muscle_group
                    description
                    video_url
                }
            }
        }
    }
    }
  }
`;

export const AllTrainingsPaginationQuery = graphql`
  query AllTrainingsPaginationQuery {
    me {
      email
    }
    ...AllTrainingsPagination
  }
`;