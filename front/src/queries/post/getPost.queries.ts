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

        tags {
          _id
          name
        }
        createdAt
      }

      siblingPost {
        next {
          _id
          title
        }
        prev {
          _id
          title
        }
      }
    }
  }
`;
