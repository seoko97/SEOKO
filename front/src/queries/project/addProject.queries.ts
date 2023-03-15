import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
  mutation AddProject($input: AddProjectInput!) {
    addProject(input: $input) {
      ok
      error
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
      }
    }
  }
`;
