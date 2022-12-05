import React from "react";
import Head from "next/head";
import styled from "@emotion/styled";

import RowFrame from "@frames/RowFrame";

import AboutSkillSection from "@organisms/AboutSection/Skill";
import AboutExperienceSection from "@organisms/AboutSection/Experience/AboutExperienceSection";
import AboutProjectSection from "@organisms/AboutSection/Project/AboutProjectSection";
import AboutHeader from "./AboutHeader";

const About = () => {
  return (
    <>
      <Head>
        <title>소개 :: SEOKO</title>
        <meta
          name="description"
          content="개발자 지석호의 소개 페이지입니다. 저의 경험을 나열해 놓았습니다."
        />
        <meta name="og:title" content="소개 :: SEOKO" />
        <meta
          name="og:description"
          content="개발자 지석호의 소개 페이지입니다. 저의 경험을 나열해 놓았습니다."
        />
      </Head>
      <Container>
        <AboutHeader />
        <AboutSkillSection />
        <AboutExperienceSection />
        <AboutProjectSection />
      </Container>
    </>
  );
};

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  gap: 4em;
  margin: 3.5em auto;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 0.9rem;
  }
`;

export default About;
