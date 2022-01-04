import React from "react";
import Card from "@atoms/Card";
import styled from "@emotion/styled";
import Link from "next/link";

const StyledInner = styled.div`
  & > div {
    min-height: 200px;
    border-radius: 5px;
    padding: 10px;

    & div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      & span {
        color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
      }
    }
    & div:last-of-type {
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      & span:last-of-type {
        padding: 5px 8px;
        background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};
        border-radius: 10px;
        font-size: 11px;
      }
    }
  }
`;

const CategoryInner = () => {
  return (
    <>
      <StyledInner>
        <Card>
          <div>
            <span>카테고리</span>
          </div>
          <Link href="/category">
            <div>
              <span>asdasd</span>
              <span>10</span>
            </div>
          </Link>
        </Card>
      </StyledInner>
    </>
  );
};

export default CategoryInner;
