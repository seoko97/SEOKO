import React from "react";
import Link from "next/link";

interface Props {
  href: string;
  name: string;
}

const NavItem: React.FC<Props> = ({ href, name }) => {
  return (
    <>
      <Link href={href.toLowerCase()}>
        <a>
          <li>{name}</li>
        </a>
      </Link>
    </>
  );
};

export default React.memo(NavItem);
