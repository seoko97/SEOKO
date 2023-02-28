import React, { useCallback, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import dynamic from "next/dynamic";

import { IExperience } from "@queries-types/experience";

import { userInfoVar } from "@store/userInfo";
import useModal from "@hooks/useModal";

import ExperienceList from "./ExperienceList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

interface IProps {
  experiences: IExperience[];
}

const ExperienceForm = dynamic(() => import("@modals/ExperienceForm"));

const AboutExperienceSection = ({ experiences }: IProps) => {
  const { username } = useReactiveVar(userInfoVar);
  const [isOpenExperienceForm, onOpenExperienceForm, onCloseExperienceForm] = useModal();
  const [selectedExperience, setSelectedExperience] = useState<IExperience | null>(null);

  const onClickExperience = useCallback((data: IExperience | null = null) => {
    onOpenExperienceForm();
    setSelectedExperience(data);
  }, []);

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
