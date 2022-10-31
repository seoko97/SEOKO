import React, { useCallback, useRef } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";

import { ADD_SKILL, EDIT_SKILL, DELETE_SKILL } from "@queries/skills";
import { IAddSkill, IDeleteSkill, IEditSkill, ISkill, ISkillInput } from "@queries-types/skill";

import { IAddImage } from "@queries-types/image";
import { ADD_IMAGE } from "@queries/image/addImage.queries";

import ModalLayout from "@modals/ModalLayout";
import Input from "@atoms/Input";

interface IProps {
  onClose: () => void;
  skill: ISkill | null;
}

const Container = styled.form`
  width: 600px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding: 30px 20px;

  border-radius: 12px;
  margin-top: 30px;

  z-index: 101;
  & > span {
    cursor: pointer;
    font-size: 20px;
    align-self: flex-end;
  }
  & > div {
    display: flex;
    flex-direction: column;
    & > input,
    select {
      border: none;
    }
  }
  & button {
    margin-top: 10px;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    margin: 40px 16px 0 16px;
  }
`;

const SkillForm = ({ onClose, skill }: IProps) => {
  const formDataRef = useRef<ISkillInput>({
    name: skill?.name || "",
    icon: skill?.icon || "",
    type: skill?.type || null,
  });

  const [addImageMutation] = useMutation<IAddImage>(ADD_IMAGE, {
    onCompleted({ addImage }) {
      const { image } = addImage;
      formDataRef.current.icon = image;
    },
  });

  const [addSkillMutation] = useMutation<IAddSkill>(ADD_SKILL, {
    onCompleted({ addSkill }) {
      if (addSkill.ok) onClose();
    },
  });
  const [editSkillMutation] = useMutation<IEditSkill>(EDIT_SKILL, {
    onCompleted({ editSkill }) {
      if (editSkill.ok) onClose();
    },
  });
  const [deleteSkillMutation] = useMutation<IDeleteSkill>(DELETE_SKILL, {
    onCompleted({ deleteSkill }) {
      if (deleteSkill.ok) onClose();
    },
  });

  const onChangeType = useCallback((e) => {
    formDataRef.current.type = e.target.value || null;
  }, []);

  const onChangeIcon: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!e.target.files) return;

    addImageMutation({
      variables: {
        input: {
          type: "skill",
          image: e.target.files[0],
        },
      },
    });
  }, []);

  const onChangeName = useCallback((e) => {
    formDataRef.current.name = e.target.value;
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const conf = confirm("저장하시겠습니까?");

      if (!conf) return;

      if (skill) {
        formDataRef.current._id = skill._id;
        editSkillMutation({ variables: { input: formDataRef.current } });
      } else {
        addSkillMutation({ variables: { input: formDataRef.current } });
      }
    },
    [formDataRef.current],
  );

  const deleteSkill = useCallback(() => {
    const conf = confirm("삭제하시겠습니까?");

    if (!conf) return;

    deleteSkillMutation({
      variables: {
        input: { _id: skill?._id },
      },
    });
  }, [skill]);

  return (
    <ModalLayout onClick={onClose}>
      <Container>
        <h2>스킬</h2>
        <div>
          <span>분류</span>
          <select onChange={onChangeType}>
            <option value="">선택</option>
            <option value="FRONT_END">FRONT</option>
            <option value="BACK_END">BACK</option>
            <option value="DEV_OPS">DEVOPS</option>
          </select>
        </div>
        <div>
          <span>이름</span>
          <Input placeholder="이름입력" onChange={onChangeName} />
        </div>

        <div>
          <span>아이콘</span>
          <input type="file" onChange={onChangeIcon} />
        </div>
        <div>
          {skill && <button onClick={deleteSkill}>삭제</button>}
          <button type="submit" onClick={onSubmitForm}>
            저장
          </button>
        </div>
      </Container>
    </ModalLayout>
  );
};

export default SkillForm;
