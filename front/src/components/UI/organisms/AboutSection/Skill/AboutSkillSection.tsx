import React, { useCallback, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import dynamic from "next/dynamic";

import { ISkill, ISkills } from "@queries-types/skill";

import { userInfoVar } from "@store/userInfo";
import useModal from "@hooks/useModal";

import SkillList from "./SkillList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

interface IProps {
  skills: ISkills;
}

const SkillForm = dynamic(() => import("@modals/SkillForm"));

const AboutSkillSection = ({ skills }: IProps) => {
  const { username } = useReactiveVar(userInfoVar);
  const [isOpenSkillForm, onOpenSkillForm, onCloseSkillForm] = useModal();
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);

  const onClickSkill = useCallback((data: ISkill | null = null) => {
    onOpenSkillForm();
    setSelectedSkill(data);
  }, []);

  return (
    <>
      <Section>
        <SectionHeader onClick={onClickSkill}>Skill</SectionHeader>
        <SkillList
          skills={skills.front}
          onClick={username ? onClickSkill : null}
          type="Front-End"
        />
        <SkillList skills={skills.back} onClick={username ? onClickSkill : null} type="Back-End" />
        <SkillList skills={skills.devops} onClick={username ? onClickSkill : null} type="DevOps" />
      </Section>
      {isOpenSkillForm && <SkillForm onClose={onCloseSkillForm} skill={selectedSkill} />}
    </>
  );
};

export default AboutSkillSection;
