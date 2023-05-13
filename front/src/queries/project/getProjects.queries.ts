import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects($input: GetProjectsInput) {
    getProjects(input: $input) {
      ok

      projects {
        _id
        title
        description
        coverImg
        startDate
        endDate
        isTemporary
        numId
      }
    }
  }
`;
