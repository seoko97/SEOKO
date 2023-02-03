import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";

import useInput from "@hooks/useInput";
import {
  IAddExperience,
  IDeleteExperience,
  IEditExperience,
  IExperience,
  IExperienceInput,
} from "@queries-types/experience";
import { ADD_EXPERIENCE, EDIT_EXPERIENCE, DELETE_EXPERIENCE } from "@queries/experience";

import Input from "@atoms/Input";
import Button from "@atoms/Button";
import ModalLayout from "@modals/ModalLayout";

interface IProps {
  onClose: () => void;
  experience: IExperience | null;
}

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

const ExperienceForm = ({ experience, onClose }: IProps) => {
  const [title, onChangeTitle] = useInput(experience?.title || "");
  const [startDate, onChangeStartDate] = useInput(experience?.startDate || "");
  const [endDate, onChangeEndDate] = useInput(experience?.endDate || "");
  const [description, onChangeDescription] = useInput(experience?.description || "");

  const [addExpMutation] = useMutation<IAddExperience>(ADD_EXPERIENCE, {
    onCompleted({ addExperience }) {
      if (addExperience.ok) onClose();
    },
  });
  const [editExpMutation] = useMutation<IEditExperience>(EDIT_EXPERIENCE, {
    onCompleted({ editExperience }) {
      if (editExperience.ok) onClose();
    },
  });
  const [deleteExpMutation] = useMutation<IDeleteExperience>(DELETE_EXPERIENCE, {
    onCompleted({ deleteExperience }) {
      if (deleteExperience.ok) onClose();
    },
  });

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!title && !description && !startDate && !endDate)
        return alert("모든 항목을 입력해야합니다.");

      const conf = confirm("저장하시겠습니까?");

      if (!conf) return;

      const input: IExperienceInput = {
        title,
        description,
        startDate,
        endDate,
      };

      if (experience) {
        input._id = experience._id;
        editExpMutation({ variables: { input } });
      } else {
        addExpMutation({ variables: { input } });
      }
    },
    [experience, title, description, startDate, endDate],
  );

  const onClickDeleteBtn = useCallback(() => {
    const conf = confirm("삭제하시겠습니까?");

    if (!conf) return;

    deleteExpMutation({
      variables: { input: { _id: experience?._id } },
    });
  }, [experience]);

  return (
    <ModalLayout onClick={onClose}>
      <Container onSubmit={onSubmitForm}>
        <h3>경력</h3>
        <div>
          <span>회사명:</span>
          <Input value={title} onChange={onChangeTitle} />
        </div>
        <div>
          <span>상세:</span>
          <textarea value={description} onChange={onChangeDescription} />
        </div>
        <div>
          <label htmlFor="startDate">시작</label>
          <Input name="startDate" value={startDate} onChange={onChangeStartDate} type="date" />
        </div>
        <div>
          <label htmlFor="endDate">종료</label>
          <Input name="endDate" value={endDate} onChange={onChangeEndDate} type="date" />
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
export default ExperienceForm;
