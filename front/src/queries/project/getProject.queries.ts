import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query GetProject($input: String!) {
    getProject(input: $input) {
      ok
      error
      project {
        _id
        title
        description
        content
        coverImg
        githubUrl
        startDate
        endDate
      }
    }
  }
`;
