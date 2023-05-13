import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($input: CreatePostInput!) {
    addPost(input: $input) {
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
