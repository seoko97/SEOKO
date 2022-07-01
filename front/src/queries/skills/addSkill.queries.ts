import { gql } from "@apollo/client";

export const ADD_SKILL = gql`
  mutation AddSkill($input: AddSkillInput!) {
    addSkill(input: $input) {
      ok
      error
      skill {
        _id
        name
        type
        icon
      }
    }
  }
`;
