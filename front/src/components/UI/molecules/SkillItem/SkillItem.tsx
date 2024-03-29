import styled from "@emotion/styled";
import { ISkill } from "@queries-types/skill";
import Image from "next/future/image";
import React, { useMemo } from "react";

interface IProps {
  data: ISkill;
  onClick: ((data: ISkill) => void) | null;
}

const Container = styled.div<{ isAdmin: boolean }>`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  gap: 0.5em;

  & img {
    object-fit: scale-down;
    cursor: ${({ isAdmin }) => (isAdmin ? "pointer" : "default")};
  }

  & h3 {
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    text-align: center;
    font-weight: bold;
    white-space: pre-wrap;
    word-break: break-word;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    width: 100px;
  }
`;

const SkillItem = ({ data, onClick }: IProps) => {
  const isAdmin = useMemo(() => Boolean(onClick), [onClick]);

  return (
    <Container isAdmin={isAdmin}>
      <Image
        priority
        src={data.icon}
        width={76}
        height={76}
        alt={data.name}
        onClick={onClick ? () => onClick(data) : () => undefined}
      />
      <h3>{data.name}</h3>
    </Container>
  );
};

export default SkillItem;
