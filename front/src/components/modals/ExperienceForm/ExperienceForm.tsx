import React, { useCallback } from "react";
import styled from "@emotion/styled";
import ModalLayout from "@modals/ModalLayout";
import {
  IAddExperience,
  IDeleteExperience,
  IEditExperience,
  IExperience,
  IExperienceInput,
} from "@queries-types/experience";
import Input from "@atoms/Input";
import useInput from "@hooks/useInput";
import { useMutation } from "@apollo/client";

import { ADD_EXPERIENCE, EDIT_EXPERIENCE, DELETE_EXPERIENCE } from "@queries/experience";

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

  & button {
    flex: 1;
    cursor: pointer;
    margin-top: 10px;
    padding: 1em;
    border-radius: 3px;
    border: none;
    background-color: ${({ theme }) => theme.BACKGROUND_COLOR.PRIMARY_COLOR};
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  & > .button-form {
    flex-direction: row;
    justify-content: space-between;
    gap: 1em;
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
          {experience && (
            <button type="button" onClick={onClickDeleteBtn}>
              삭제
            </button>
          )}
          <button type="submit">저장</button>
        </div>
      </Container>
    </ModalLayout>
  );
};
export default ExperienceForm;
