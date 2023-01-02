import React, { useCallback, useRef } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";

import { ADD_SKILL, EDIT_SKILL, DELETE_SKILL } from "@queries/skills";
import { IAddSkill, IDeleteSkill, IEditSkill, ISkill, ISkillInput } from "@queries-types/skill";

import { IAddImage } from "@queries-types/image";
import { ADD_IMAGE } from "@queries/image/addImage.queries";

import ModalLayout from "@modals/ModalLayout";
import Input from "@atoms/Input";
import Button from "@atoms/Button";

interface IProps {
  onClose: () => void;
  skill: ISkill | null;
}

const Container = styled.form`
  width: 600px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 2em;
  background-color: #eeeeee;
  padding: 30px 20px;

  border-radius: 12px;
  margin-top: 30px;

  z-index: 101;

  & > h1 {
    font-size: 1.1em;
    text-align: center;
    font-weight: 500;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 1.2em;

    & h3 {
      font-weight: 500;
    }
  }

  & img {
    width: 76px;
    height: 76px;
  }

  & button {
    flex: 1;
    margin-top: 0.5em;
    padding: 0.5em;

    &[name="delete"] {
      background-color: #ff7373;
      color: #fff;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 95%;
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

  const deleteSkill = useCallback(
    (e) => {
      e.preventDefault();
      const conf = confirm("삭제하시겠습니까?");

      if (!conf) return;

      deleteSkillMutation({
        variables: {
          input: { _id: skill?._id },
        },
      });
    },
    [skill],
  );

  return (
    <ModalLayout onClick={onClose}>
      <Container>
        <h1>스킬 등록</h1>
        <div>
          <h3>분류</h3>
          <select onChange={onChangeType} defaultValue={formDataRef.current.type ?? ""}>
            <option value="">선택</option>
            <option value="FRONT_END">FRONT</option>
            <option value="BACK_END">BACK</option>
            <option value="DEV_OPS">DEVOPS</option>
          </select>
        </div>
        <div>
          <h3>이름</h3>
          <Input
            placeholder="이름입력"
            onChange={onChangeName}
            defaultValue={formDataRef.current.name ?? ""}
          />
        </div>

        <div>
          <h3>아이콘</h3>
          {formDataRef.current.icon && <img alt="icon" src={formDataRef.current.icon} />}
          <input type="file" onChange={onChangeIcon} />
        </div>
        <div>
          {skill && (
            <Button onClick={deleteSkill} name="delete">
              삭제
            </Button>
          )}
          <Button name="save" onClick={onSubmitForm}>
            저장
          </Button>
        </div>
      </Container>
    </ModalLayout>
  );
};

export default SkillForm;
