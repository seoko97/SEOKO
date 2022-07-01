import { gql } from "@apollo/client";

export const GET_ABOUT = gql`
  query getAboutData {
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
    getProjects {
      ok
      error
      projects {
        _id
        title
        description
        coverImg
        startDate
        endDate
      }
    }
    getExperiences {
      ok
      error
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
