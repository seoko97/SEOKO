import styled from "@emotion/styled";
import React from "react";

interface IProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
}

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  row-gap: 6px;
  padding: 10px;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  transition: opacity 0.3s;

  & .ath,
  & .date {
    width: 100%;
  }

  & .ath {
    font-size: 0.9em;
  }

  & .date {
    font-size: 0.7em;
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
  }

  & h3 {
    font-size: 1.1em;
    font-weight: 700;
  }
`;

const ProjectCaption = ({ title, description, startDate, endDate }: IProps) => {
  return (
    <Container className="caption">
      <h3>{title}</h3>
      <div className="ath">{description}</div>
      <p className="date">
        {startDate} ~ {endDate || "진행중"}
      </p>
    </Container>
  );
};

export default ProjectCaption;
