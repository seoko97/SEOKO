import React from "react";
import { useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import Link from "next/link";
import { StyledCard } from "@atoms/Card";
import { categoryState } from "@states/categories/atoms";

const StyledInner = styled(StyledCard)`
  min-height: 200px;
  border-radius: 5px;
  padding: 10px;
  width: 100%;

  & span {
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  & > div:first-of-type {
    padding: 10px;
    margin-bottom: 10px;
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 10px;
      height: 30px;
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
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
  const categories = useRecoilValue(categoryState);

  return (
    <>
      <StyledInner>
        <div>
          <span>카테고리</span>
        </div>
        <div>
          {categories.length ? (
            <>
              {categories.map((category) => (
                <Link href={`/category/${category.title}`} key={category.id}>
                  <div>
                    <span>{category.title}</span>
                    <span>{category.posts}</span>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </StyledInner>
    </>
  );
};

export default CategoryInner;
