import { gql } from "@apollo/client";

export const GET_TAG = gql`
  query GetTag($input: String!) {
    getTag(input: $input) {
      ok

      tag {
        _id
        name
        posts {
          _id
        }
      }
    }
  }
`;
