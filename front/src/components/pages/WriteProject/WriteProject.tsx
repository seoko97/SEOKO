import React, { useCallback, useRef } from "react";
import { useQuery } from "@apollo/client";

import TuiEditor from "@organisms/TuiEditor";
import WriteFooter from "@molecules/WriteFooter";
import { Container } from "@pages/WritePost/WritePost";

import { IGetProject, IProject, IProjectInput } from "@queries-types/project";

import { GET_PROJECT } from "@queries/project";
import { useAddImage } from "@hooks/apollo/image/useAddImage";
import { useWriteProject } from "@hooks/write/project/useWriteProject";
import { useProjectMutation } from "@hooks/apollo/project/useProjectMutation";
import WriteProjectHeader from "./WriteProjectHeader";

interface IProps {
  project: IProject | undefined;
  numId?: number;
}

const WriteProject = ({ numId }: IProps) => {
  const { data } = useQuery<IGetProject>(GET_PROJECT, {
    variables: { input: numId },
    skip: numId === undefined,
  });

  const project = data?.getProject.project;

  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const [mutation] = useProjectMutation(project);

  const [projectDataRef, onChangeValue, onChangeContent] = useWriteProject(project);
  const [coverImg, onChangeImage, clearCoverImage] = useAddImage({
    defaultImg: project?.coverImg,
    type: "project",
  });

  const { title, description, startDate, endDate, githubUrl } = projectDataRef.current;

  const addProject = useCallback(
    (e) => {
      const confirmProject = confirm("저장하시겠습니까?");

      if (!confirmProject) return;

      const { dataset } = e.target;
      const isTemporary = Boolean(dataset.isTemporary);
      const input: IProjectInput = { ...projectDataRef.current, isTemporary, coverImg };

      mutation(input);
    },
    [projectDataRef, project, coverImg],
  );

  const coverImageHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (photoInputRef?.current) photoInputRef.current.click();
    },
    [photoInputRef],
  );

  return (
    <Container>
      <WriteProjectHeader
        title={title}
        description={description}
        startDate={startDate}
        endDate={endDate ?? ""}
        coverImg={coverImg}
        githubUrl={githubUrl}
        photoInputRef={photoInputRef}
        onChangeValue={onChangeValue}
        onChangeImage={onChangeImage}
        clearCoverImage={clearCoverImage}
        coverImageHandler={coverImageHandler}
      />
      <TuiEditor initialValue={project?.content} onChange={onChangeContent} />
      <WriteFooter save={addProject} />
    </Container>
  );
};

export default WriteProject;
