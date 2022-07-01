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
import { ADD_EXPERIENCE } from "@queries/experience/addExperience.queries";
import { EDIT_EXPERIENCE } from "@queries/experience/editExperience.queries";
import { DELETE_EXPERIENCE } from "@queries/experience/deleteExperience.queries";

interface IProps {
  onClose: () => void;
  experience: IExperience | null;
}

const Container = styled.form`
  width: 600px;
  height: fit-content;
  max-height: 600px;

  display: flex;
  gap: 20px;
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

  & button {
    cursor: pointer;
    margin-top: 10px;
  }
  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

const ExperienceForm = ({ experience, onClose }: IProps) => {
  const [title, onChangeTitle] = useInput(experience?.title || "");
  const [startDate, onChangeStartDate] = useInput(experience?.startDate || "");
  const [endDate, onChangeEndDate] = useInput(experience?.endDate || "");
  const [description, onChangeDescription] = useInput(experience?.description || "");

  const [addExpMutation] = useMutation<IAddExperience>(ADD_EXPERIENCE);
  const [editExpMutation] = useMutation<IEditExperience>(EDIT_EXPERIENCE);
  const [deleteExpMutation] = useMutation<IDeleteExperience>(DELETE_EXPERIENCE);

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
          <span>회사명: </span>
          <Input value={title} onChange={onChangeTitle} />
        </div>
        <div>
          <span>상세: </span>
          <textarea value={description} onChange={onChangeDescription} />
        </div>
        <div>
          <span>시작/종료: </span>
          <Input value={startDate} onChange={onChangeStartDate} />
          ~
          <Input value={endDate} onChange={onChangeEndDate} />
        </div>
        <div>
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
