import { gql } from "@apollo/client";

export const SEARCH_POSTS = gql`
  query SearchPosts($input: SearchPostsInput) {
    searchPosts(input: $input) {
      ok
      error
      posts {
        _id
        content
        title
        coverImg
        createdAt
        tags {
          _id
          name
        }
      }
    }
  }
`;
