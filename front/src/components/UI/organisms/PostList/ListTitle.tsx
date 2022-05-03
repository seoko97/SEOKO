import styled from "@emotion/styled";
import React from "react";

const StyledListTitle = styled.div`
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  font-size: 30px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  position: absolute;
`;

const ListTitle = () => {
  return (
    <>
      <StyledListTitle>
        <h2>Posts</h2>
        <hr />
      </StyledListTitle>
    </>
  );
};

export default ListTitle;
