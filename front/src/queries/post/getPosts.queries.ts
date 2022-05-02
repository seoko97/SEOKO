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
