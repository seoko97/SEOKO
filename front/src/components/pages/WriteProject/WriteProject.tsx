import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import TuiEditor from "@organisms/TuiEditor";
import WriteFooter from "@molecules/WriteFooter";
import RowFrame from "@frames/RowFrame";

import { ADD_PROJECT } from "@queries/project/addProject.queries";
import { EDIT_PROJECT } from "@queries/project/editProject.queries";
import { IAddProject, IEditProject, IProject, IProjectInput } from "@queries-types/project";
import useInput from "@hooks/useInput";

import WriteProjectHeader from "./WriteProjectHeader";

interface IProps {
  project: IProject | undefined;
}

const WriteProject = ({ project }: IProps) => {
  const router = useRouter();
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const [title, onChangeTitle] = useInput(project?.title || "");
  const [description, onChangeDec] = useInput(project?.description || "");
  const [githubUrl, onChangeGithubUrl] = useInput(project?.githubUrl || "");

  const [content, setContent] = useState<string>(project?.content || "");
  const [coverImg, setCoverImg] = useState<string>(project?.coverImg || "");
  const [startDate, setStartDate] = useState<string>(project?.startDate || "");
  const [endDate, setEndDate] = useState<string>(project?.endDate || "");

  const checkVariable = useMemo(
    () =>
      title.length &&
      content.length &&
      description.length &&
      githubUrl.length &&
      coverImg.length &&
      startDate.length,
    [title, content, description, githubUrl, coverImg, startDate],
  );

  const [addProjectMutation] = useMutation<IAddProject>(ADD_PROJECT, {
    onCompleted({ addProject }) {
      if (addProject?.ok) router.push("/");
    },
  });

  const [editProjectMutation] = useMutation<IEditProject>(EDIT_PROJECT, {
    onCompleted({ editProject }) {
      if (editProject?.ok) router.push("/");
    },
  });

  const addProject = useCallback(() => {
    const comfirmProject = confirm("저장하시겠습니까?");

    if (!comfirmProject) return;

    if (checkVariable) {
      const input: IProjectInput = {
        title,
        content,
        description,
        githubUrl,
        coverImg,
        startDate,
        endDate: endDate.length > 0 ? endDate : null,
      };

      if (project) {
        input._id = project._id;
        editProjectMutation({
          variables: { input },
        });
      } else {
        addProjectMutation({
          variables: { input },
        });
      }
    } else alert("다시 입력해 주세요.");
  }, [checkVariable, title, content, description, githubUrl, coverImg, startDate, endDate]);

  const clearCoverImage = useCallback(() => {
    setCoverImg("");
  }, []);

  const onChangeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      setCoverImg(
        "https://velog.velcdn.com/post-images/godori/496c0830-3dc1-11e9-bc03-611ba17bddf2/banner-maker.png",
      );
  }, []);

  const onChangeDate = useCallback((e) => {
    const inputName = e.target.name;

    if (inputName === "startDate") setStartDate(e.target.value);
    else setEndDate(e.target.value);
  }, []);

  const coverImageHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (photoInputRef?.current) photoInputRef.current.click();
    },
    [photoInputRef],
  );

  return (
    <RowFrame>
      <WriteProjectHeader
        title={title}
        description={description}
        coverImg={coverImg}
        githubUrl={githubUrl}
        startDate={startDate}
        endDate={endDate}
        photoInputRef={photoInputRef}
        onChangeTitle={onChangeTitle}
        onChangeDec={onChangeDec}
        onChangeGithubUrl={onChangeGithubUrl}
        onChangeDate={onChangeDate}
        onChangeImage={onChangeImage}
        clearCoverImage={clearCoverImage}
        coverImageHandler={coverImageHandler}
      />
      <TuiEditor initialValue={content} onChange={setContent} />
      <WriteFooter save={addProject} />
    </RowFrame>
  );
};

export default WriteProject;
