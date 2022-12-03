import { gql } from "@apollo/client";

export const EDIT_POST = gql`
  mutation EditPost($input: EditPostInput!) {
    editPost(input: $input) {
      ok
      error
    }
  }
`;
