import React from "react";
import styled from "@emotion/styled";

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  box-shadow: 0 1px 6px 0 hsla(0, 0%, 0%, 0.1);
`;

interface Props {
  children: React.ReactNode;
}

const Card = ({ children }: Props) => (
  <>
    <StyledCard>{children}</StyledCard>
  </>
);

export default Card;
