import React from "react";
import NextLink, { LinkProps } from "next/link";

interface Props extends LinkProps {
  name: string;
}

const NavItem: React.FC<Props> = ({ href, name }) => {
  return (
    <NextLink href={href}>
      <a>
        <li>{name}</li>
      </a>
    </NextLink>
  );
};

export default NavItem;
