import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

interface Props {
  href: string;
  name: string;
  emoji: string;
}

const StyledNavItem = styled.li`
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;

  & a {
    display: block;
    width: 100%;
    font-weight: 700;
  }
  & span {
    display: none;
  }

  &:hover {
    & a {
      transition: color 0.25s ease-in-out 0s;

      color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.SECONDARY_COLOR};
    }
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    margin-bottom: 15px;
    padding-left: 15px;
    & span {
      display: inline-block;
    }
  }
`;

const NavItem: React.FC<Props> = ({ emoji, href, name }) => (
  <>
    <StyledNavItem>
      <Link href={href.toLowerCase()} prefetch={false}>
        <a>
          <span>{emoji}</span> {name}
        </a>
      </Link>
    </StyledNavItem>
  </>
);

export default React.memo(NavItem);
