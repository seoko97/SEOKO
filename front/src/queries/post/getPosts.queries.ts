import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($input: GetPostsInput) {
    getPosts(input: $input) {
      ok
      error
      posts {
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
