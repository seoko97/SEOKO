import { gql } from "@apollo/client";

export const EDIT_SKILL = gql`
  mutation EditSkill($input: EditSkillInput!) {
    editSkill(input: $input) {
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
