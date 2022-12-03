import React from "react";

import styled from "@emotion/styled";

import Input from "@atoms/Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1em 1.1em;
  margin-bottom: 1em;

  & input {
    width: 100%;
    padding: 1.1em 1em;

    transition: background-color 0.3s;
    background-color: ${({ theme }) => theme.BACKGROUND_COLOR.PRIMARY_COLOR};
    border: 1px solid #ccc;
    border-radius: 4px;

    font-size: 1.1em;
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    padding: 20px 0;

    & > input {
      font-size: 1em;
      padding: 0.6rem;
    }
  }
`;

interface IProps {
  onChangeText: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchForm = ({ onChangeText }: IProps) => {
  return (
    <Container>
      <Input onChange={onChangeText} placeholder="검색어를 입력하세요" />
    </Container>
  );
};

export default SearchForm;
