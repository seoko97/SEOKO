import styled from "@emotion/styled";
import React from "react";
import CategoryInner from "./CategoryInner";

const StyledCategory = styled.div`
  flex: 1;
  position: sticky;
  top: 100px;
  align-self: flex-start;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    position: relative;
    top: 0;
    width: 100%;
    margin-bottom: 30px;
  }
`;

const MainCategory = () => {
  return (
    <>
      <StyledCategory>
        <CategoryInner />
      </StyledCategory>
    </>
  );
};

export default MainCategory;
