import { removeTypename } from "@lib/removeTypename";
import { IProject, IProjectInput } from "@queries-types/project";
import { useCallback, useRef } from "react";

const PROJECT: IProjectInput = {
  title: "",
  description: "",
  githubUrl: "",
  content: "",
  coverImg: "",
  startDate: "",
  endDate: "",
};

const useWriteProject = (project?: IProject) => {
  const data = removeTypename(project) ?? PROJECT;

  const projectDataRef = useRef<IProjectInput>(data);

  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const name = e.target.name as keyof IProjectInput;

      if (projectDataRef.current[name] === undefined) return;

      projectDataRef.current[name] = e.target.value as never;
    },
    [projectDataRef],
  );

  const onChangeContent = useCallback(
    (value: string) => {
      projectDataRef.current.content = value;
    },
    [projectDataRef],
  );

  return [projectDataRef, onChangeValue, onChangeContent] as const;
};

export { useWriteProject };
