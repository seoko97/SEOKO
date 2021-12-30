import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

interface Props {
  href: string;
  name: string;
}

const StyledNavItem = styled.li`
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  cursor: pointer;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const NavItem: React.FC<Props> = ({ href, name }) => {
  return (
    <>
      <Link href={href.toLowerCase()} prefetch={false}>
        <StyledNavItem>{name}</StyledNavItem>
      </Link>
    </>
  );
};

export default React.memo(NavItem);
