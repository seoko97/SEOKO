import React from "react";
import styled from "@emotion/styled";

import Footer from "@organisms/Footer";
import Header from "@organisms/Header";

const StyledAppLayout = styled.div`
  width: 100%;
  min-height: 100vh;

  position: relative;
  padding-bottom: 140px;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.PRIMARY_COLOR};
  transition: background-color 0.3s;
  z-index: 0;
`;

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <StyledAppLayout>
        <Header />
        {children}
        <Footer />
      </StyledAppLayout>
    </>
  );
};

export default AppLayout;
