import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query GetSkills {
    getSkills {
      ok
      error
      skills {
        front {
          _id
          name
          type
          icon
        }
        back {
          _id
          name
          type
          icon
        }
        devops {
          _id
          name
          type
          icon
        }
      }
    }
  }
`;
