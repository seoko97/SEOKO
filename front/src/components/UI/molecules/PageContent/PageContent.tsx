import React from "react";
import styled from "@emotion/styled";

const StyledPageContent = styled.div`
  width: 100%;
  padding-top: 30px;
`;

interface Props {
  children: React.ReactNode;
}

const PageContent = ({ children }: Props) => {
  return (
    <>
      <StyledPageContent>{children}</StyledPageContent>
    </>
  );
};

export default PageContent;
