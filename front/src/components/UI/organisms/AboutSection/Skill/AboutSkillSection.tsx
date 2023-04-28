import React, { useCallback, useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import dynamic from "next/dynamic";

import { IGetSkills, ISkill } from "@queries-types/skill";

import { userInfoVar } from "@store/userInfo";
import useModal from "@hooks/useModal";

import { GET_SKILLS } from "@queries/skills";
import SkillList from "./SkillList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

const SkillForm = dynamic(() => import("@modals/SkillForm"));

const AboutSkillSection = () => {
  const { username } = useReactiveVar(userInfoVar);
  const { data } = useQuery<IGetSkills>(GET_SKILLS);
  const [isOpenSkillForm, onOpenSkillForm, onCloseSkillForm] = useModal();
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);

  const onClickSkill = useCallback((data: ISkill | null = null) => {
    onOpenSkillForm();
    setSelectedSkill(data);
  }, []);

  if (!data) return <></>;

  const { front, back, devops } = data.getSkills.skills;

  const onClick = username ? onClickSkill : null;

  return (
    <>
      <Section>
        <SectionHeader onClick={onClickSkill}>Skill</SectionHeader>
        <SkillList skills={front} onClick={onClick} type="Front-End" />
        <SkillList skills={back} onClick={onClick} type="Back-End" />
        <SkillList skills={devops} onClick={onClick} type="DevOps" />
      </Section>
      {isOpenSkillForm && <SkillForm onClose={onCloseSkillForm} skill={selectedSkill} />}
    </>
  );
};

export default AboutSkillSection;
