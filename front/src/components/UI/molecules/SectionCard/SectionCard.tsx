import React from "react";
import styled from "@emotion/styled";

interface IProps {
  count: string;
  title: string;
  description: string;
}

const SectionCard = ({ count, title, description }: IProps) => {
  return (
    <Container>
      <h3>{count}</h3>
      <span>{title}</span>
      <p>{description}</p>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  padding: 1.5rem;
  gap: 0.75rem;

  border-radius: 1rem;

  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  box-shadow: ${({ theme }) => theme.BOX_SHADOW.PRIMARY};

  & > h3 {
    font-size: 1.75rem;
    line-height: 1.3;
  }

  & > span {
    font-size: 1.2rem;
    line-height: 1.3;
    font-weight: 700;
    word-break: keep-all;
    white-space: pre-line;
  }

  & > p {
    font-size: 0.9rem;

    line-height: 1.6;
    font-weight: 400;

    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
  }
`;

export default SectionCard;
