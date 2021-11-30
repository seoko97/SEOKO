import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

interface Props {
  href: string;
  name: string;
}

const StyledNavItem = styled.li<{ path: string; name: string }>`
  box-sizing: border-box;
  padding: 15px 10px;
  width: 100%;

  & a {
    display: block;
    width: 100%;
    font-weight: 700;
  }

  &:hover {
    & a {
      transition: all 0.25s ease-in-out 0s;
      filter: brightness(50%);
    }
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    margin-bottom: 15px;
    padding-left: 15px;
    color: ${({ theme, path, name }) =>
      name === path ? "inherit" : theme.SELECTION_EFFECT_COLOR.SECONDARY_COLOR};
  }
`;

const NavItem: React.FC<Props> = ({ href, name }) => {
  const router = useRouter();
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    const p = router.asPath.split("/")[1].toUpperCase();
    setPath(p === "" ? "HOME" : p);
  }, [router.asPath]);

  return (
    <>
      <StyledNavItem path={path} name={name}>
        <Link href={href.toLowerCase()} prefetch={false}>
          <a>{name}</a>
        </Link>
      </StyledNavItem>
    </>
  );
};

export default React.memo(NavItem);
