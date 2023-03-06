import React from "react";
import styled from "@emotion/styled";
import { IExperience } from "@queries-types/experience";

interface IProps {
  experiences: IExperience[];
  onClick: ((data: IExperience) => void) | null;
}

const ExperienceList = ({ experiences, onClick }: IProps) => {
  return (
    <Container>
      {experiences.map((experience) => (
        <Experience key={experience._id}>
          <div className="info">
            <h3>{experience.title}</h3>
            <p>
              {experience.startDate} ~ {experience.endDate}
            </p>
          </div>
          <ul className="desc" onClick={onClick ? () => onClick(experience) : undefined}>
            {experience.description.split("\n").map((desc, i) => (
              <li key={desc + i}>{desc}</li>
            ))}
          </ul>
        </Experience>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2.25em;
`;

const Experience = styled.div`
  width: 100%;
  display: flex;

  gap: 1.75rem;

  & > .info {
    width: 200px;
    text-wrap: wrap;
    & > h3 {
      font-size: 1.4em;
      font-weight: 500;
    }

    & > p {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
      margin-top: 5px;
    }
  }

  & > .desc {
    flex: 1;

    display: flex;
    flex-direction: column;
    height: fit-content;

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
    gap: 1.25em;
    flex-direction: column;

    & > .info {
      width: 100%;
      text-wrap: wrap;
    }
  }
`;

export default ExperienceList;
