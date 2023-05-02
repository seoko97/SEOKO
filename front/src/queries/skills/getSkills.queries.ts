import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query GetSkills {
    getSkills {
      ok
      skills {
        FRONT_END {
          _id
          name
          type
          icon
        }
        BACK_END {
          _id
          name
          type
          icon
        }
        DEV_OPS {
          _id
          name
          type
          icon
        }
      }
    }
  }
`;
