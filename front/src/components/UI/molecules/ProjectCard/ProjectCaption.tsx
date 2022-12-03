import styled from "@emotion/styled";
import React from "react";

interface IProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 6px;
  padding: 10px;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  transition: opacity 0.3s;

  & .ath,
  & .date {
    width: 100%;
    max-width: 200px;
    font-size: 0.8em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & .date {
    color: #8f8f8f;
  }

  & h3 {
    font-size: 1.1em;
    font-weight: 500;
  }
`;

const ProjectCaption = ({ title, description, startDate, endDate }: IProps) => {
  return (
    <Container className="caption">
      <h3>{title}</h3>
      <div className="ath">{description}</div>
      <p className="date">
        {startDate} ~ {endDate ?? "진행중"}
      </p>
    </Container>
  );
};

export default ProjectCaption;
