import { gql, useMutation } from "@apollo/client";
import {
  IAddProject,
  IAddProjectVariables,
  IDeleteProject,
  IEditProject,
  IProjectInput,
} from "@queries-types/project";
import { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from "@queries/project";
import { useRouter } from "next/router";

const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    _id
    title
    description
    coverImg
    startDate
    endDate
    isTemporary
  }
`;

const useProjectMutation = (project?: IProjectInput) => {
  const router = useRouter();

  const onCompleted = () => {
    router.push("/project");
  };

  const [addProjectMutation] = useMutation<IAddProject, IAddProjectVariables>(ADD_PROJECT, {
    onCompleted,
    update: (cache) => {
      cache.evict({ fieldName: "getProjects" });
      cache.gc();
    },
  });

  const [editProjectMutation] = useMutation<IEditProject, IAddProjectVariables>(EDIT_PROJECT, {
    onCompleted,
    update: (cache, { data }) => {
      if (!data?.editProject) return;

      const { project } = data.editProject;

      cache.writeFragment({
        id: `Project:${project._id}`,
        fragment: PROJECT_FRAGMENT,
        data: project,
      });
      cache.evict({ fieldName: "getProjects" });
      cache.gc();
    },
  });

  const onMutation = async (input: IProjectInput) => {
    const mutation = project ? editProjectMutation : addProjectMutation;

    await mutation({ variables: { input } });
  };

  return [onMutation];
};

const useDeleteProject = (_id: string) => {
  const router = useRouter();

  const onCompleted = () => {
    router.push("/project");
  };

  const [deleteProjectMutation] = useMutation<IDeleteProject>(DELETE_PROJECT, {
    onCompleted,
    update: (cache) => {
      const id = cache.identify({ _id, __typename: "Project" });

      cache.evict({ id });
      cache.gc();
    },
  });

  const onDelete = async () => {
    await deleteProjectMutation({ variables: { input: { _id } } });
  };

  return [onDelete];
};

export { useProjectMutation, useDeleteProject };
