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

  & > h4 {
    font-size: 1.1rem;
    font-weight: 500;
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.3rem;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    & > div {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    padding: 8px 0;
  }
`;

const SkillList = ({ skills, onClick, type }: IProps) => {
  return (
    <Container>
      <h4>{type}</h4>
      <div>
        {skills.map((skill) => (
          <SkillItem key={skill._id} onClick={onClick || null} data={skill} />
        ))}
      </div>
    </Container>
  );
};

export default SkillList;
