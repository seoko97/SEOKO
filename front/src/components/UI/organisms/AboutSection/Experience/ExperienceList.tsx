import React from "react";
import styled from "@emotion/styled";
import { IExperience } from "@queries-types/experience";

interface IProps {
  experiences: IExperience[];
  onClick: ((data: IExperience) => void) | null;
}
const Container = styled.div`
  width: 100%;

  & > div {
    display: flex;
    gap: 3em;
    margin-bottom: 1.8em;
  }

  & h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  & .info {
    width: 200px;
    text-wrap: wrap;
  }

  & .date {
    font-size: 0.9em;
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    margin-top: 5px;
  }

  & .desc {
    font-size: 0.9rem;
    white-space: pre-wrap;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    padding: 0.5em;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & h3 {
      font-size: 1.6em;
    }

    & .info {
      width: 100%;
      text-wrap: wrap;
    }

    & .date {
      font-size: 1.1em;
    }

    & > div {
      gap: 1em;
      flex-direction: column;
    }
  }
`;

const ExperienceList = ({ experiences, onClick }: IProps) => {
  return (
    <Container>
      {experiences.map((experience) => (
        <div key={experience._id}>
          <div className="info">
            <h3>{experience.title}</h3>
            <p className="date">
              {experience.startDate} ~ {experience.endDate}
            </p>
          </div>
          <div className="desc" onClick={onClick ? () => onClick(experience) : undefined}>
            <p>{experience.description}</p>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default ExperienceList;
