import { gql } from "@apollo/client";

export const EDIT_POST = gql`
  mutation EditPost($input: EditPostInput!) {
    editPost(input: $input) {
      ok
      error
      post {
        _id
        content
        title
        coverImg
        category
        isTemporary
        tags {
          _id
          name
        }
        createdAt
      }
    }
  }
`;
