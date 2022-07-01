import styled from "@emotion/styled";
import React from "react";

interface IProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
}

const Container = styled.div`
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  padding: 10px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 41%,
    rgba(0, 0, 0, 0) 42%,
    rgba(0, 0, 0, 0.65) 100%
  );
  color: #f2f2f2;

  transition: opacity 0.3s;

  & .ath {
    font-size: 0.8em;
    color: #dadada;
  }

  & h3 {
    font-weight: 500;
  }
`;

const ProjectCaption = ({ title, description, startDate, endDate }: IProps) => {
  return (
    <Container className="caption">
      <h3>{title}</h3>
      <p className="ath">{description}</p>
      <p className="ath">
        {startDate} ~ {endDate ?? "진행중"}
      </p>
    </Container>
  );
};

export default ProjectCaption;
