import React, { useCallback, useRef } from "react";
import styled from "@emotion/styled";

import { ISkill, ISkillInput } from "@queries-types/skill";

import ModalLayout from "@modals/ModalLayout";
import Input from "@atoms/Input";
import Button from "@atoms/Button";
import { useAddImage } from "@hooks/apollo/image/useAddImge";
import { useSkillMutation } from "@hooks/apollo/skill/useSkillMutation";

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
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 95%;
    margin: 40px 16px 0 16px;
  }
`;

const SkillForm = ({ onClose, skill }: IProps) => {
  const formDataRef = useRef<Omit<ISkillInput, "icon">>({
    _id: skill?._id ?? undefined,
    name: skill?.name ?? "",
    type: skill?.type ?? null,
  });

  const [coverImg, onChangeImage] = useAddImage({
    defaultImg: skill?.icon ?? "",
    type: "skill",
  });

  const [onCreateOrUpdateSkill, onDeleteSkill] = useSkillMutation(onClose);

  const onChangeType = useCallback((e) => {
    formDataRef.current.type = e.target.value || null;
  }, []);

  const onChangeName = useCallback((e) => {
    formDataRef.current.name = e.target.value;
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const conf = confirm("저장하시겠습니까?");

      if (!conf) return;

      const input = { ...formDataRef.current, icon: coverImg };

      onCreateOrUpdateSkill(input);
    },
    [formDataRef.current],
  );

  const deleteSkill = useCallback(
    (e) => {
      e.preventDefault();
      const conf = confirm("삭제하시겠습니까?");

      if (!conf || !skill) return;

      onDeleteSkill(skill._id);
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
          {coverImg && <img alt="icon" src={coverImg} />}
          <input type="file" onChange={onChangeImage} />
        </div>
        <div>
          <Button name="save" onClick={onSubmitForm} buttonType="primary">
            저장
          </Button>
          {skill && (
            <Button onClick={deleteSkill} name="delete" buttonType="danger">
              삭제
            </Button>
          )}
        </div>
      </Container>
    </ModalLayout>
  );
};

export default SkillForm;
