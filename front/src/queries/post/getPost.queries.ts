import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetPost($input: GetPostInput!) {
    getPost(input: $input) {
      ok
      error
      post {
        _id
        content
        title
        coverImg
        category {
          _id
          name
        }
        tags {
          _id
          name
        }
        createdAt
      }
    }
  }
`;
