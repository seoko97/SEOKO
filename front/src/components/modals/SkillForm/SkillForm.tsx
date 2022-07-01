import React, { memo, useCallback, useState } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";

import { EDIT_SKILL } from "@queries/skills/editSkill.queries";
import { DELETE_SKILL } from "@queries/skills/deleteSkill.queries";
import { ADD_SKILL } from "@queries/skills/addSkill.queries";
import {
  IAddSkill,
  IDeleteSkill,
  IEditSkill,
  ISkill,
  ISkillInput,
  SkillType,
} from "@queries-types/skill";

import ModalLayout from "@modals/ModalLayout";
import useInput from "@hooks/useInput";
import Input from "@atoms/Input";

interface IProps {
  onClose: () => void;
  skill: ISkill | null;
}

const Container = styled.div`
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
  }
`;

const SkillForm = ({ onClose, skill }: IProps) => {
  const [name, onChangeName] = useInput(skill?.name ?? "");
  const [icon, setIcon] = useState<string>(skill?.icon ?? "");
  const [type, setType] = useState<SkillType | null>(skill?.type ?? null);

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
    setType(e.target.value || null);
  }, []);

  const onChangeIcon = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIcon("/graphql.png");
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!name || !icon || !type) return alert("모든 항목을 입력해야합니다.");

      const conf = confirm("저장하시겠습니까?");

      if (!conf) return;
      const input: ISkillInput = {
        name,
        type,
        icon,
      };

      if (skill) {
        input._id = skill._id;
        editSkillMutation({ variables: { input } });
      } else {
        console.log(input);
        addSkillMutation({ variables: { input } });
      }
    },
    [skill, name, icon, type],
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
          <Input value={name} placeholder="이름입력" onChange={onChangeName} />
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

export default memo(SkillForm, (prev, next) => prev.skill === next.skill);
