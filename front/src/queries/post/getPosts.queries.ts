import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    getPosts {
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
