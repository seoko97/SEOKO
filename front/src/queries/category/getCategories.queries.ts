import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    getCategories {
      ok
      error
      categories {
        _id
        name
        posts {
          _id
        }
      }
    }
  }
`;
