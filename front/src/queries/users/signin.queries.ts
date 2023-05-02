import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      ok
      username
    }
  }
`;
