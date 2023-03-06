import { addApolloState } from "@lib/addApolloState";
import { initializeClient } from "@lib/apollo";
import { IGetAbout } from "@queries-types/about";
import { GET_ABOUT } from "@queries/about";
import { GET_PROJECTS } from "@queries/project";
import { GetServerSideProps } from "next";

export { default } from "@pages/About";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  const { data } = await apolloClient.query<IGetAbout>({
    query: GET_ABOUT,
    variables: {
      input: { isTemporary: false },
    },
  });

  return addApolloState(apolloClient, {
    props: {
      skills: data?.getSkills.skills ?? [],
      experiences: data?.getExperiences.experiences ?? [],
      projects: data?.getProjects.projects ?? [],
    },
  });
};
