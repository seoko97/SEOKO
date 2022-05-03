import React, { forwardRef, ReactNode } from "react";
import styled from "@emotion/styled";

interface Props {
  children: ReactNode;
  isActive: boolean;
}

const Container = styled.nav`
  position: absolute;
  top: 60px;
  right: 0px;

  width: 150px;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  box-shadow: 0px 9px 15px -15px #454545;
  border-radius: 10px;
  padding: 10px 8px;

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

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
    top: 72px;
    right: 0;
    border-radius: 0;
    padding: 10px;
  }
`;

const UserNav = forwardRef<HTMLDivElement, Props>(({ isActive, children }, ref) => {
  return (
    <Container ref={ref} className={`menu ${isActive ? "active" : "inactive"}`}>
      {children}
    </Container>
  );
});

export default UserNav;
