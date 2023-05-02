import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
  mutation DeleteProject($input: ProjectInput!) {
    deleteProject(input: $input) {
      ok
    }
  }
`;
