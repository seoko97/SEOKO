import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($input: GetPostsInput) {
    getPosts(input: $input) {
      ok

      posts {
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
