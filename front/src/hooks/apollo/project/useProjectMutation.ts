import { useMutation } from "@apollo/client";
import {
  IAddProject,
  IAddProjectVariables,
  IEditProject,
  IProject,
  IProjectInput,
} from "@queries-types/project";
import { ADD_PROJECT, EDIT_PROJECT } from "@queries/project";
import { useRouter } from "next/router";

const useProjectMutation = (project?: IProject) => {
  const router = useRouter();

  const onCompleted = () => {
    router.push("/project");
  };

  const [addProjectMutation] = useMutation<IAddProject, IAddProjectVariables>(ADD_PROJECT, {
    onCompleted,
  });

  const [editProjectMutation] = useMutation<IEditProject, IAddProjectVariables>(EDIT_PROJECT, {
    onCompleted,
  });

  const onMutation = async (input: IProjectInput) => {
    const mutation = project ? editProjectMutation : addProjectMutation;

    await mutation({ variables: { input } });
  };

  return [onMutation];
};

export { useProjectMutation };
