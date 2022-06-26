import styled from "@emotion/styled";
import React from "react";

interface IProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  padding: 10px;

  & .date {
    font-size: 0.8em;
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
  }

  & h3 {
    font-weight: 500;
    font-size: 1.2em;
  }
`;

const ProjectCaption = ({ title, description, startDate, endDate }: IProps) => {
  return (
    <Container>
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="date">
        {startDate} ~ {endDate ?? "진행중"}
      </p>
    </Container>
  );
};

export default ProjectCaption;
