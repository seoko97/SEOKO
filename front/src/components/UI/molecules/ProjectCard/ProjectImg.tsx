import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

interface IProps {
  src: string;
}
const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 70%;
  border-radius: 10px 10px 0 0;

  & img {
    border-radius: 10px 10px 0 0;
    position: relative;
    object-fit: cover;
    transition: transform 0.3s;
  }
`;

const ProjectImg = ({ src }: IProps) => {
  return (
    <Container>
      <Image src={src} alt="project-image" layout="fill" />
    </Container>
  );
};

export default ProjectImg;
