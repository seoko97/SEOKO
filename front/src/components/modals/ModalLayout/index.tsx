import React, { FC } from "react";

import ModalPortal from "../ModalPortal";

interface Props {
  state: boolean;
}

const ModalLayout: FC<Props> = ({ children, state }) => {
  return (
    <ModalPortal state={state}>
      <div>{children}</div>
    </ModalPortal>
  );
};

export default ModalLayout;
