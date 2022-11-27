import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import Info from "@molecules/Intro/Info";

const AboutHeader = () => {
  return (
    <Container>
      <div>
        <h1>
          안녕하세요 <br /> 개발자 <strong>지석호</strong>입니다.
        </h1>
        <div className="user-image">
          <Image
            priority
            placeholder="blur"
            blurDataURL="/main.jpg"
            src="/main.jpg"
            alt="main"
            width={200}
            height={200}
          />
        </div>
      </div>

      <p>
        프론트엔드 개발자를 희망하고 있는 지석호입니다. 꾸준히 공부하며 발전하는 것과 실천하는 것을
        좋아합니다. 이를 통해 발전하며 누군가의 멘토가 되는것을 목표로 하고 있습니다.
      </p>
      <Info />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 40px;

  & > div:first-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }

  & .user-image * {
    border-radius: 5px;
  }

  & h1 {
    flex-grow: 1;
    font-size: 3rem;
    font-weight: 300;
  }
  & strong {
    font-weight: 700;
  }

  & > p {
    font-weight: 300;
  }

  & > div:last-of-type {
    margin-top: 20px;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    padding: 10px 0;

    & > div:first-of-type {
      padding: 10px 0;
    }

    & .user-image {
      display: none;
    }
    & h1 {
      font-size: 2rem;
    }
  }
`;

export default AboutHeader;
