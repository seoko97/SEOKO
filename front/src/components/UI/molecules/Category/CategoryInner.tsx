import React from "react";
import Card from "@atoms/Card";
import styled from "@emotion/styled";

const StyledInner = styled.div`
  & > div {
    min-height: 200px;
    border-radius: 5px;
    padding: 20px;
  }
`;

const CategoryInner = () => {
  return (
    <>
      <StyledInner>
        <Card>asd</Card>
      </StyledInner>
    </>
  );
};

export default CategoryInner;
