import { gql } from "@apollo/client";

export const GET_ABOUT = gql`
  query getAboutData($input: GetProjectsInput) {
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
    getProjects(input: $input) {
      ok
      projects {
        _id
        title
        description
        coverImg
        startDate
        endDate
        isTemporary
        numId
      }
    }
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
