import { gql } from "@apollo/client";

export const EDIT_EXPERIENCE = gql`
  mutation EditExperience($input: EditExperienceInput!) {
    editExperience(input: $input) {
      ok
      error
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
