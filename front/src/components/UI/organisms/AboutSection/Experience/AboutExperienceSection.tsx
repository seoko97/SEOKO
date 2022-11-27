import React, { useCallback, useEffect, useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";

import { IGetAbout } from "@queries-types/about";
import { IExperience } from "@queries-types/experience";
import { GET_ABOUT } from "@queries/about";

import { userInfoVar } from "@store/userInfo";
import useModal from "@hooks/useModal";

import ExperienceForm from "@modals/ExperienceForm";

import ExperienceList from "./ExperienceList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

const AboutExperienceSection = () => {
  const { username } = useReactiveVar(userInfoVar);
  const [isOpenExperienceForm, onOpenExperienceForm, onCloseExperienceForm] = useModal();
  const [selectedExperience, setSelectedExperience] = useState<IExperience | null>(null);

  const { data, refetch } = useQuery<IGetAbout>(GET_ABOUT);

  const onClickExperience = useCallback((data: IExperience | null = null) => {
    onOpenExperienceForm();
    setSelectedExperience(data);
  }, []);

  useEffect(() => {
    refetch();
  }, [isOpenExperienceForm]);

  return (
    <>
      <Section>
        <SectionHeader onClick={onClickExperience}>Experience</SectionHeader>
        <ExperienceList
          experiences={data?.getExperiences.experiences ?? []}
          onClick={username ? onClickExperience : null}
        />
      </Section>
      {isOpenExperienceForm && (
        <ExperienceForm onClose={onCloseExperienceForm} experience={selectedExperience} />
      )}
    </>
  );
};

export default AboutExperienceSection;
