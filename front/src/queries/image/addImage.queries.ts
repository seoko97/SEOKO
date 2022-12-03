import { gql } from "@apollo/client";

export const ADD_IMAGE = gql`
  mutation AddImage($input: AddImageInput!) {
    addImage(input: $input) {
      ok
      image
    }
  }
`;
