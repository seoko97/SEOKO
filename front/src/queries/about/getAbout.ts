import { gql } from "@apollo/client";

export const GET_ABOUT = gql`
  query getAboutData($input: GetProjectsInput) {
    getSkills {
      ok
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
