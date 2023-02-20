import React from "react";
import Head from "next/head";

import RowFrame from "@frames/RowFrame";
import Intro from "@molecules/Intro";

import styled from "@emotion/styled";
import MainContent from "@organisms/MainContent";

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="개발자를 목표로 공부하고 있는 지석호의 블로그, 포트폴리오 웹 페이지입니다."
        />
        <meta property="og:title" content="SEOKO" />
        <meta property="og:image" content="https://image.toast.com/aaaacgm/SEOKO.png" />
        <meta
          property="og:description"
          content="개발자를 목표로 공부하고 있는 지석호의 블로그, 포트폴리오 웹 페이지입니다."
        />
      </Head>
      <Container>
        <Intro />
        <MainContent />
      </Container>
    </>
  );
};

export default Home;
