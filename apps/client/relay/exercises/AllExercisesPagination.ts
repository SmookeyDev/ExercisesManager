import { graphql } from "react-relay";

export const AllExercisesPaginationFragment = graphql`
  fragment AllExercisesPagination on Query
  @argumentDefinitions(first: { type: Int, defaultValue: 15 }, after: { type: String }, search: { type: String })
  @refetchable(queryName: "AllExercisesManagerPaginationQuery") {
    allExercises(first: $first, after: $after, search: $search)
      @connection(key: "exercises_allExercises", filters: ["search"]) {
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
          id
          name
          muscle_group
          description
          video_url
        }
      }
    }
  }
`;

export const AllExercisesPaginationQuery = graphql`
  query AllExercisesPaginationQuery {
    me {
      email
    }
    ...AllExercisesPagination
  }
`;