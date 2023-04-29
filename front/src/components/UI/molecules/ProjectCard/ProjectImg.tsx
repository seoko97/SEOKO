import React from "react";
import Image from "next/future/image";
import styled from "@emotion/styled";

interface IProps {
  src: string;
}
const Container = styled.div`
  flex: 2;
  position: relative;
  width: 100%;
  aspect-ratio: 130 / 100;
  border-radius: 10px 10px 0 0;

  & > img {
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }
`;

const ProjectImg = ({ src }: IProps) => {
  return (
    <Container>
      <Image priority src={src} alt="project-image" fill />
    </Container>
  );
};

export default ProjectImg;
