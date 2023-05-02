import React, { useCallback, useRef } from "react";
import styled from "@emotion/styled";

import { IExperience, IExperienceInput } from "@queries-types/experience";

import Input from "@atoms/Input";
import Button from "@atoms/Button";
import ModalLayout from "@modals/ModalLayout";
import { useExperienceMutation } from "@hooks/apollo/experience/useExperienceMutation";
import { removeTypename } from "@lib/removeTypename";

interface IProps {
  onClose: () => void;
  experience: IExperience | null;
}

const EXPERIENCE = {
  title: "",
  description: "",
  endDate: "",
  startDate: "",
};

const ExperienceForm = ({ experience, onClose }: IProps) => {
  const data = removeTypename(experience) ?? EXPERIENCE;
  const experienceInputRef = useRef<IExperienceInput>(data);

  const [onCreateOrUpdateExp, onDeleteExp] = useExperienceMutation(onClose);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      const { title, description, endDate, startDate } = experienceInputRef.current;

      if (!title || !description || !startDate || !endDate) {
        return alert("모든 항목을 입력해야합니다.");
      }

      const conf = confirm("저장하시겠습니까?");

      if (!conf) return;

      onCreateOrUpdateExp(experienceInputRef.current);
    },
    [experienceInputRef.current],
  );

  const onClickDeleteBtn = useCallback(() => {
    const conf = confirm("삭제하시겠습니까?");

    if (!conf || !experience) return;

    onDeleteExp(experience._id);
  }, [experience]);

  const onChangeExperienceInput: React.ChangeEventHandler = (e) => {
    const target = e.currentTarget as HTMLInputElement;

    const { value } = target;
    const name = target.name as keyof IExperienceInput;

    experienceInputRef.current[name] = value;
  };

  const { title, description, endDate, startDate } = experienceInputRef.current;

  return (
    <ModalLayout onClick={onClose}>
      <Container onSubmit={onSubmitForm}>
        <h3>경력</h3>
        <div>
          <span>회사명:</span>
          <Input defaultValue={title} name="title" onChange={onChangeExperienceInput} />
        </div>
        <div>
          <span>상세:</span>
          <textarea
            defaultValue={description}
            name="description"
            onChange={onChangeExperienceInput}
          />
        </div>
        <div>
          <label htmlFor="startDate">시작</label>
          <Input
            defaultValue={startDate}
            name="startDate"
            onChange={onChangeExperienceInput}
            type="date"
          />
        </div>
        <div>
          <label htmlFor="endDate">종료</label>
          <Input
            defaultValue={endDate}
            name="endDate"
            onChange={onChangeExperienceInput}
            type="date"
          />
        </div>
        <div className="button-form">
          <Button type="submit" buttonType="primary">
            저장
          </Button>
          {experience && (
            <Button type="button" onClick={onClickDeleteBtn} buttonType="danger">
              삭제
            </Button>
          )}
        </div>
      </Container>
    </ModalLayout>
  );
};

const Container = styled.form`
  width: 600px;
  height: fit-content;
  max-height: 600px;

  display: flex;
  gap: 1em;
  flex-direction: column;
  background-color: #eeeeee;
  padding: 30px 20px;
  border-radius: 12px;
  margin-top: 30px;

  z-index: 101;

  & h3 {
    font-size: 1.3rem;
    font-weight: 500;
  }

  & input[type="text"],
  & textarea {
    flex: 1;
  }

  & textarea {
    flex: 1;
    max-width: 100%;
    min-height: 100px;
    resize: none;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  & > .button-form {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1em;

    & > button {
      flex: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    margin: 40px 16px 0 16px;
  }
`;

export default ExperienceForm;
