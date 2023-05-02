import { gql } from "@apollo/client";

export const EDIT_PROJECT = gql`
  mutation EditProject($input: EditProjectInput!) {
    editProject(input: $input) {
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
      }
    }
  }
`;
