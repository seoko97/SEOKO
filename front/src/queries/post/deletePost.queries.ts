import { gql } from "@apollo/client";

export const DELETE_POST = gql`
  mutation DeletePost($input: BasePostInput!) {
    deletePost(input: $input) {
      ok
    }
  }
`;
