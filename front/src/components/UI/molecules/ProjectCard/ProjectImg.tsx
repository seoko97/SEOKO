import React from "react";
import Image from "@atoms/Image";
import styled from "@emotion/styled";

interface IProps {
  src: string;
}
const Container = styled.div`
  flex: 2;
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  aspect-ratio: 130 / 100;
  & > img {
    border-radius: 10px 10px 0 0;
  }
`;

const ProjectImg = ({ src }: IProps) => {
  return (
    <Container>
      <Image priority src={src} alt="project-image" />
    </Container>
  );
};

export default ProjectImg;
