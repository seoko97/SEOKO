import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

interface IProps {
  src: string;
}
const Container = styled.div`
  flex: 2;
  position: relative;
  width: 100%;
  padding-bottom: 70%;
  border-radius: 10px 10px 0 0;

  & img {
    border-radius: 10px 10px 0 0;
    transition: transform 0.3s;
  }

  & span {
    border-radius: 10px 10px 0 0;
  }
`;

const ProjectImg = ({ src }: IProps) => {
  return (
    <Container>
      <Image priority src={src} alt="project-image" layout="fill" objectFit="cover" />
    </Container>
  );
};

export default ProjectImg;
