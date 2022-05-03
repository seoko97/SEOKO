import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const StyledLogo = styled.div`
  font-size: 30px;

  & > span {
    & a {
      transition: color 0.3s;
      font-weight: 700;
      & span {
        color: ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
      }
    }
  }
`;

const Logo = () => {
  return (
    <>
      <StyledLogo>
        <span>
          <Link href="/">
            <a>
              SE<span>O</span>KO
            </a>
          </Link>
        </span>
      </StyledLogo>
    </>
  );
};

export default React.memo(Logo);
