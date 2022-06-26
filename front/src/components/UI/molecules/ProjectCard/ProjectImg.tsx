import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

interface IProps {
  src: string;
}
const Container = styled.div`
  position: relative;
  padding-bottom: 180px;
  border-radius: 10px 10px;
  background-color: #ccc;
  transition: transform 0.3s, box-shadow 0.3s;

  & img {
    position: relative;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    padding-bottom: 70%;
  }
`;

const ProjectImg = ({ src }: IProps) => {
  return (
    <Container>
      <Image src={src} alt="project-image" objectFit="cover" layout="fill" />
    </Container>
  );
};

export default ProjectImg;
