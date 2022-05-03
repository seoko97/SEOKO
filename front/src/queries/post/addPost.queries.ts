import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($input: CreatePostInput!) {
    addPost(input: $input) {
      ok
      error
    }
  }
`;
