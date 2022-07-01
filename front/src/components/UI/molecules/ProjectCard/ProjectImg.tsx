import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

interface IProps {
  src: string;
}
const Container = styled.div`
  position: relative;
  padding-bottom: 100%;
  border-radius: 10px 10px;
  background-color: #ccc;

  & img {
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
