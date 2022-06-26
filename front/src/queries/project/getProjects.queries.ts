import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
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
  }
`;
