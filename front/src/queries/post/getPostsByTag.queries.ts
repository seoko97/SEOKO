import { gql } from "@apollo/client";

export const GET_POSTS_BY_TAG = gql`
  query GetPostsByTag($input: GetPostsByTagInput) {
    getPostsByTag(input: $input) {
      ok
      error
      posts {
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
    }
  }
`;
