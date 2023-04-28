import { gql } from "@apollo/client";

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      ok

      experiences {
        _id
        title
        description
        startDate
        endDate
      }
    }
  }
`;
