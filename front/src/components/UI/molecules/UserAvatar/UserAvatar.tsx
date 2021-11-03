import React from "react";
import Link from "next/link";

import styled from "@emotion/styled";

const StyledUserAvatar = styled.div`
  width: 42px;
  height: 42px;

  border-radius: 50%;
  background-color: #ccc;

  cursor: pointer;

  & > img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const UserAvatar = () => {
  return (
    <>
      <StyledUserAvatar>
        <Link href="/signin">
          <img src="/main.jpg" alt="me" />
        </Link>
      </StyledUserAvatar>
    </>
  );
};

export default React.memo(UserAvatar);
