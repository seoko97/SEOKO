import React from "react";
import styled from "@emotion/styled";
import { IExperience } from "@queries-types/experience";

interface IProps {
  experiences: IExperience[];
  onClick: ((data: IExperience) => void) | null;
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;

  & > div {
    display: flex;
    gap: 3em;
    margin-bottom: 1.8em;
  }

  & h3 {
    font-size: 1.4em;
    font-weight: 500;
  }

  & .info {
    width: 200px;
    text-wrap: wrap;
  }

  & .date {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    margin-top: 5px;
  }

  & .desc {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-size: 0.9rem;
    white-space: pre-wrap;

    & > li {
      list-style: inside;
      &::marker {
        color: ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & .info {
      width: 100%;
      text-wrap: wrap;
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
          <ul className="desc" onClick={onClick ? () => onClick(experience) : undefined}>
            {experience.description.split("\n").map((desc, i) => (
              <li key={desc + i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default ExperienceList;
