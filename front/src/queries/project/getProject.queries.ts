import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query GetProject($input: Float!) {
    getProject(input: $input) {
      ok

      project {
        _id
        title
        description
        content
        coverImg
        githubUrl
        isTemporary
        startDate
        endDate
        numId
      }
    }
  }
`;
