import React, { memo } from "react";
import styled from "@emotion/styled";
import InputBox from "@molecules/InputBox/InputBox";
import Categories from "./Categories";

interface IProps {
  changeCategory: (e: string) => void;
  changeText: React.ChangeEventHandler<HTMLInputElement>;
}

const ContentHeader = ({ changeCategory, changeText }: IProps) => {
  return (
    <Container>
      <Categories changeCategory={changeCategory} />
      <InputBox onChangeText={changeText} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    gap: 1rem;
  }
`;

export default memo(ContentHeader);
