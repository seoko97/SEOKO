import React from "react";
import styled from "@emotion/styled";
import UserAvatar from "@molecules/UserAvatar";

const StyledNavFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  & > a {
    max-height: 35px;
  }

  & > div {
    width: 35px;
    height: 35px;
  }
`;

const NavFooter = () => (
  <StyledNavFooter>
    <UserAvatar />
  </StyledNavFooter>
);

export default React.memo(NavFooter);
