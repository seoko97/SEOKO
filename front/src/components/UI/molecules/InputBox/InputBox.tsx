import React from "react";

import styled from "@emotion/styled";

import Input from "@atoms/Input";
import SearchIcon from "@icons/SearchIcon/SearchIcon";

interface IProps {
  onChangeText?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputBox: React.FC<IProps> = ({ onChangeText }) => {
  return (
    <Container>
      <Input placeholder="어떤글을 찾으시나요?" onChange={onChangeText} />
      <SearchIcon />
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  position: relative;

  & > input:focus-visible {
    & + svg {
      fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }

  & > svg {
    z-index: 1;
    position: absolute;
    top: 9px;
    right: 0.8rem;
    transition: fill 0.2s, background-color 0.2s;
    fill: #d2d6dc;

    width: 1.1rem;
    height: 1.1rem;
    background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
  }
`;

export default InputBox;
