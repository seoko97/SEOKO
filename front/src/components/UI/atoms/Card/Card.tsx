import React from "react";
import styled from "@emotion/styled";

export const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  box-shadow: 0 1px 6px 0 hsla(0, 0%, 0%, 0.1);
`;

const Card: React.FC = ({ children }) => (
  <>
    <StyledCard>{children}</StyledCard>
  </>
);

export default Card;
