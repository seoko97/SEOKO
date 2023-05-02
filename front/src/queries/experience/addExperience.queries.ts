import { gql } from "@apollo/client";

export const ADD_EXPERIENCE = gql`
  mutation AddExperience($input: AddExperienceInput!) {
    addExperience(input: $input) {
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
