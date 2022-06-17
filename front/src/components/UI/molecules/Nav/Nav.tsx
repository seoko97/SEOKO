import React, { forwardRef, memo, ReactNode } from "react";
import styled from "@emotion/styled";

interface Props {
  children: ReactNode;
  isActive: boolean;
}

const Container = styled.nav`
  position: absolute;
  top: 60px;
  right: 0px;

  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  box-shadow: 0px 9px 15px -15px #454545;
  border-radius: 10px;

  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;

  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    right: 16px;
  }
`;

const UserNav = forwardRef<HTMLDivElement, Props>(({ isActive, children }, ref) => {
  return (
    <Container ref={ref} className={`menu ${isActive ? "active" : "inactive"}`}>
      {children}
    </Container>
  );
});

export default memo(UserNav);
