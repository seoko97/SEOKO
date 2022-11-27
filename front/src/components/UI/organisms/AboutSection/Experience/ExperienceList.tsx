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
    gap: 40px;
    margin-bottom: 16px;
  }

  & .info {
    & > h3 {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 5px;
    }

    & > .date {
      font-size: 0.9em;
      color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
      margin-top: 5px;
    }
  }

  & .desc {
    font-size: 0.9rem;
    white-space: pre-wrap;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    padding: 8px 0;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > div {
      gap: 8px;
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
