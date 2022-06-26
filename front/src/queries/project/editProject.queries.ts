import { gql } from "@apollo/client";

export const EDIT_PROJECT = gql`
  mutation EditProject($input: EditProjectInput!) {
    editProject(input: $input) {
      ok
      error
    }
  }
`;
