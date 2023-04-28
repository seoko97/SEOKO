import { gql } from "@apollo/client";

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($input: DeleteExperienceInput!) {
    deleteExperience(input: $input) {
      ok
      experience {
        _id
        title
        description
        startDate
        endDate
      }
    }
  }
`;
