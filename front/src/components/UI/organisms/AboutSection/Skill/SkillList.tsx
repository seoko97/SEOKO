import React from "react";
import styled from "@emotion/styled";
import SkillItem from "@molecules/SkillItem";
import { ISkill } from "@queries-types/skill";

interface IProps {
  skills: ISkill[];
  onClick: ((data: ISkill) => void) | null;
  type: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;

  & > h3 {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.7rem;
  }

  & > div {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-items: center;
    grid-row-gap: 1.5em;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    padding: 0.5em 0;
    & > div {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > div {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const SkillList = ({ skills, onClick, type }: IProps) => {
  return (
    <Container>
      <h3>{type}</h3>
      <div>
        {skills.map((skill) => (
          <SkillItem key={skill._id} onClick={onClick || null} data={skill} />
        ))}
      </div>
    </Container>
  );
};

export default SkillList;
