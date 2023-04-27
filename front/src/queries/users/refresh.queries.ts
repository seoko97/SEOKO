import { gql } from "@apollo/client";

export const REFRESH = gql`
  mutation {
    refresh {
      ok
    }
  }
`;
