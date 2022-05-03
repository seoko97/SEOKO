import styled from "@emotion/styled";

export default styled.div`
  width: 980px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    width: 100%;
    padding: 0 16px;
  }
`;
