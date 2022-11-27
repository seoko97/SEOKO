import React, { useCallback, useEffect, useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";

import { ISkill } from "@queries-types/skill";
import { IGetAbout } from "@queries-types/about";
import { GET_ABOUT } from "@queries/about";

import { userInfoVar } from "@store/userInfo";
import useModal from "@hooks/useModal";

import SkillForm from "@modals/SkillForm";

import SkillList from "./SkillList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

const AboutSkillSection = () => {
  const { username } = useReactiveVar(userInfoVar);
  const [isOpenSkillForm, onOpenSkillForm, onCloseSkillForm] = useModal();
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);

  const { data, refetch } = useQuery<IGetAbout>(GET_ABOUT);

  const onClickSkill = useCallback((data: ISkill | null = null) => {
    onOpenSkillForm();
    setSelectedSkill(data);
  }, []);

  useEffect(() => {
    refetch();
  }, [isOpenSkillForm]);

  return (
    <>
      <Section>
        <SectionHeader onClick={onClickSkill}>Skill</SectionHeader>
        <SkillList
          skills={data?.getSkills.skills.front ?? []}
          onClick={username ? onClickSkill : null}
          type="Front-End"
        />
        <SkillList
          skills={data?.getSkills.skills.back ?? []}
          onClick={username ? onClickSkill : null}
          type="Back-End"
        />
        <SkillList
          skills={data?.getSkills.skills.devops ?? []}
          onClick={username ? onClickSkill : null}
          type="DevOps"
        />
      </Section>
      {isOpenSkillForm && <SkillForm onClose={onCloseSkillForm} skill={selectedSkill} />}
    </>
  );
};

export default AboutSkillSection;
