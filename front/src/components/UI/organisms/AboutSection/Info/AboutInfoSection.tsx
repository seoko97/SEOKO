import React from "react";
import styled from "@emotion/styled";
import SectionCard from "@molecules/SectionCard";

const ABOUT_INFOS = [
  {
    count: "1️⃣",
    title: "성장을 즐기는 개발자",
    description:
      "저는 취미가 개발입니다. 꾸준히 공부하고 개발하며 어제보다 성장한 저를 발견하는 것에 즐거움을 느낍니다. 새로운 기술들을 공부하고 이를 나의 것으로 만들며 끊임없이 고민하고 성장합니다.",
  },
  {
    count: "2️⃣",
    title: "기록하는 개발자",
    description:
      "공부한 내용을 정리하거나 프로젝트를 진행하며 마주쳤던 문제들의 해결과정을 기록하고 있습니다. '왜'를 중시하는 문서화를 통해 체계적이고 효율적으로 개발하기 위해 노력하고 있습니다.",
  },
  {
    count: "3️⃣",
    title: "소통하는 개발자",
    description:
      "개발자에게 협업은 필수입니다. 이를 위해 소통하는 것을 중요하게 생각합니다. 꾸준한 코드리뷰와 회의 등을 통해 협업을 진행하면서 소통능력을 향상시키기 위해 노력하고 있습니다.",
  },
];

const AboutInfoSection = () => {
  return (
    <Container>
      {ABOUT_INFOS.map((data, i) => (
        <SectionCard key={data.title + i} {...data} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    flex-direction: column;
  }
`;

export default AboutInfoSection;
