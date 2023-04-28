import { gql } from "@apollo/client";

export const DELETE_SKILL = gql`
  mutation DeleteSkill($input: SkillInput!) {
    deleteSkill(input: $input) {
      ok

      skill {
        _id
        name
        type
        icon
      }
    }
  }
`;
