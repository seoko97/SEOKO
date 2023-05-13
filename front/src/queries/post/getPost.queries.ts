import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetPost($input: GetPostInput!) {
    getPost(input: $input) {
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

      siblingPost {
        next {
          _id
          title
          numId
        }
        prev {
          _id
          title
          numId
        }
      }
    }
  }
`;
