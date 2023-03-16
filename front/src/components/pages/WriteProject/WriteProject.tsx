import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";

import TuiEditor from "@organisms/TuiEditor";
import WriteFooter from "@molecules/WriteFooter";
import { Container } from "@pages/WritePost/WritePost";

import { ADD_PROJECT } from "@queries/project/addProject.queries";
import { EDIT_PROJECT } from "@queries/project/editProject.queries";
import {
  IAddProject,
  IAddProjectVariables,
  IEditProject,
  IGetProject,
  IProject,
  IProjectInput,
} from "@queries-types/project";

import { IAddImage } from "@queries-types/image";
import { CoreResponse } from "@queries-types/core";
import { ADD_IMAGE } from "@queries/image/addImage.queries";

import { GET_PROJECT } from "@queries/project";
import WriteProjectHeader from "./WriteProjectHeader";

interface IProps {
  project: IProject | undefined;
  _id: string;
}

const PROJECT: IProjectInput = {
  title: "",
  description: "",
  githubUrl: "",
  content: "",
  coverImg: "",
  startDate: "",
  endDate: "",
};

const removeTypename = <T extends IProject>(data: T | undefined) => {
  if (!data) return;

  const newData = { ...data };

  if (newData.__typename) delete newData.__typename;

  return newData;
};

const WriteProject = ({ _id }: IProps) => {
  const { data } = useQuery<IGetProject>(GET_PROJECT, {
    variables: { input: _id ?? "" },
    skip: !_id,
  });

  const project = data?.getProject.project;

  const router = useRouter();
  const projectDataRef = useRef<IProjectInput>(removeTypename(project) ?? PROJECT);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const [coverImg, setCoverImg] = useState<string>(project?.coverImg || "");

  const [addImageMutation] = useMutation<IAddImage>(ADD_IMAGE, {
    onCompleted({ addImage }) {
      const { image, ok } = addImage;
      if (ok) {
        setCoverImg(image);
        projectDataRef.current.coverImg = image;
      }
    },
  });

  const [addProjectMutation] = useMutation<IAddProject, IAddProjectVariables>(ADD_PROJECT, {
    onCompleted({ addProject }) {
      movePageToProject(addProject);
    },
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "getProjects",
      });
    },
  });

  const [editProjectMutation] = useMutation<IEditProject, IAddProjectVariables>(EDIT_PROJECT, {
    onCompleted({ editProject }) {
      movePageToProject(editProject);
    },
    update(cache, { data }, { variables }) {
      if (!data) return;

      cache.writeQuery<IGetProject>({
        query: GET_PROJECT,
        variables: { input: variables?.input._id },
        data: {
          getProject: data.editProject,
        },
      });
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "getProjects",
      });
    },
  });

  const movePageToProject = <T extends CoreResponse>(data: T) => {
    if (!data.ok) return;

    router.push("/");
  };

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

  const addProject = useCallback(
    (e) => {
      const confirmProject = confirm("저장하시겠습니까?");

      if (!confirmProject) return;

      const { dataset } = e.target;
      const isTemporary = Boolean(dataset.isTemporary);
      const input: IProjectInput = { ...projectDataRef.current, isTemporary };

      if (project) {
        editProjectMutation({
          variables: { input },
        });
      } else {
        addProjectMutation({
          variables: { input },
        });
      }
    },
    [projectDataRef],
  );

  const clearCoverImage = useCallback(() => {
    setCoverImg("");
  }, []);

  const onChangeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    addImageMutation({
      variables: {
        input: {
          type: "project",
          image: e.target.files[0],
        },
      },
    });
  }, []);

  const coverImageHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (photoInputRef?.current) photoInputRef.current.click();
    },
    [photoInputRef],
  );

  const { title, description, startDate, endDate, githubUrl } = projectDataRef.current;

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
        onChangeTitle={onChangeValue}
        onChangeDec={onChangeValue}
        onChangeGithubUrl={onChangeValue}
        onChangeDate={onChangeValue}
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
