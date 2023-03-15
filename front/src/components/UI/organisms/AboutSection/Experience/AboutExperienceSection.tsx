import React, { useCallback, useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import dynamic from "next/dynamic";

import { IExperience, IGetExperiences } from "@queries-types/experience";

import { userInfoVar } from "@store/userInfo";
import useModal from "@hooks/useModal";

import { GET_EXPERIENCES } from "@queries/experience";
import ExperienceList from "./ExperienceList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

const ExperienceForm = dynamic(() => import("@modals/ExperienceForm"));

const AboutExperienceSection = () => {
  const { username } = useReactiveVar(userInfoVar);
  const { data } = useQuery<IGetExperiences>(GET_EXPERIENCES);
  const [isOpenExperienceForm, onOpenExperienceForm, onCloseExperienceForm] = useModal();
  const [selectedExperience, setSelectedExperience] = useState<IExperience | null>(null);

  const onClickExperience = useCallback((data: IExperience | null = null) => {
    onOpenExperienceForm();
    setSelectedExperience(data);
  }, []);

  if (!data) return <></>;

  const { experiences } = data.getExperiences;

  return (
    <>
      <Section>
        <SectionHeader onClick={onClickExperience}>Experience</SectionHeader>
        <ExperienceList experiences={experiences} onClick={username ? onClickExperience : null} />
      </Section>
      {isOpenExperienceForm && (
        <ExperienceForm onClose={onCloseExperienceForm} experience={selectedExperience} />
      )}
    </>
  );
};

export default AboutExperienceSection;
