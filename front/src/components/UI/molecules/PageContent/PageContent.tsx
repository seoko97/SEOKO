import React from "react";
import styled from "@emotion/styled";

const StyledPageContent = styled.div`
  width: 100%;
  margin-top: 367px;
  padding-top: 30px;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    margin-top: 338px;
    padding-top: 30px;
  } ;
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
