import { useLazyQuery, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import ModalLayout from "@modals/ModalLayout";
import { IGetCategories } from "@queries-types/categories";
import { GET_CATEGORIES } from "@queries/category/getCategories.queries";
import React, { useCallback, useState } from "react";

interface Props {
  closeModal: () => void;
  setCategory: (category: string) => void;
}

const Container = styled.div`
  width: 400px;
  height: 400px;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  & > * {
    width: 100%;
  }

  z-index: 101;
  & > ul {
    flex: 1;
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 15px;
    & > li {
      padding: 15px 5px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
      &.selected {
        opacity: 0.7;
      }
    }
  }
  & > div {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 20px;
    gap: 15px;

    & > button {
      width: 100px;
      height: 30px;
      border: 0;
      cursor: pointer;
      background-color: #367ddd;
      color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
      border-radius: 10px;
      color: #fff;

      &.close {
        background-color: #ff4136;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
    margin: 10px;
    height: 70vh;
  }
`;

const SelectCategories = ({ closeModal, setCategory }: Props) => {
  const { data } = useQuery<IGetCategories>(GET_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<HTMLElement | null>(null);

  const selectCategory = useCallback(
    (e) => {
      if (selectedCategory) selectedCategory.className = "";
      e.target.className = "selected";
      setSelectedCategory(e.target);
    },
    [selectedCategory],
  );

  const catecoryHandler = useCallback(() => {
    if (selectedCategory) {
      setCategory(selectedCategory.innerText.trim());
      closeModal();
    }
  }, [selectedCategory]);

  return (
    <>
      <ModalLayout onClick={closeModal}>
        <Container>
          <ul>
            {data?.getCategories.categories.length === 0 && "존재하지 않습니다."}
            {data?.getCategories.categories.map((category) => (
              <li onClick={selectCategory} key={category._id}>
                {category.name}
              </li>
            ))}
            <li onClick={selectCategory}>asdasd</li>
          </ul>
          <div>{selectedCategory && <>선택: {selectedCategory.innerText}</>}</div>
          <div>
            <button onClick={catecoryHandler}>저장</button>
            <button className="close" onClick={closeModal}>
              취소
            </button>
          </div>
        </Container>
      </ModalLayout>
    </>
  );
};

export default SelectCategories;
