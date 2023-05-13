import { IProject, IProjectInput } from "@queries-types/project";
import { useCallback, useRef } from "react";

const useWriteProject = (project?: IProject) => {
  const data: IProjectInput = {
    _id: project?._id,
    title: project?.title ?? "",
    description: project?.description ?? "",
    githubUrl: project?.githubUrl ?? "",
    content: project?.content ?? "",
    coverImg: project?.coverImg ?? "",
    isTemporary: project?.isTemporary ?? false,
    startDate: project?.startDate ?? "",
    endDate: project?.endDate ?? "",
  };

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
