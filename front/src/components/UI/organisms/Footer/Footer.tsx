import React from "react";
import styled from "@emotion/styled";
import RowFrame from "@frames/RowFrame";
import FooterContent from "@molecules/FooterContent";

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 140px;
  border-top: 1px solid #ccc;

  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <RowFrame>
        <FooterContent />
      </RowFrame>
    </StyledFooter>
  );
};

export default Footer;
