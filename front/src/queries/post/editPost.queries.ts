import { gql } from "@apollo/client";

export const EDIT_POST = gql`
  mutation EditPost($input: EditPostInput!) {
    editPost(input: $input) {
      ok

      post {
        _id
        content
        title
        coverImg
        category
        isTemporary
        numId
        tags {
          _id
          name
        }
        createdAt
      }
    }
  }
`;
