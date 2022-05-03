import React, { FC } from "react";
import styled from "@emotion/styled";

import ModalPortal from "../ModalPortal";

interface Props {
  onClick: () => void;
}

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalLayout: FC<Props> = ({ children, onClick }) => {
  return (
    <ModalPortal>
      <Container>
        <Overlay onClick={onClick} />
        {children}
      </Container>
    </ModalPortal>
  );
};

export default ModalLayout;
