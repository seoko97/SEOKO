import { gql } from "@apollo/client";

export const DELETE_POST = gql`
  mutation DeletePost($input: GetPostInput!) {
    deletePost(input: $input) {
      ok
      error
    }
  }
`;
