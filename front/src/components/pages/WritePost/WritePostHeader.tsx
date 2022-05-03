import React, { ChangeEvent, KeyboardEvent, MouseEvent, MutableRefObject, memo } from "react";
import styled from "@emotion/styled";

import useModal from "@hooks/useModal";
import { StyledTag } from "@atoms/Tag";
import ImageIcon from "@icons/ImageIcon/ImageIcon";
import SelectCategories from "@modals/SelectCategories/SelectCategories";

const Header = styled.header`
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;

  & input {
    background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    transition: 0.3s background-color;
    border: 0;
    outline: none;
    width: auto;
    flex: 1;
    padding: 10px 8px;
    font-size: 20px;
    font-weight: 600;
  }

  & > div#line {
    width: 100px;
    height: 8px;
    background-color: #495057;
    margin: 0 8px;
  }

  & button {
    border: 0;
    border-radius: 10px;
    padding: 5px 8px;
    background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    cursor: pointer;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    span {
      font-size: 20px;
      font-weight: 600;
    }
    svg {
      width: 60px;
      height: 60px;
      fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }

    img {
      height: 100px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    & > div {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;

interface Props {
  title: string;
  tagName: string;
  tags: string[];
  category: string;
  coverImg: string;
  deleteTag: (e: MouseEvent) => void;
  addTag: (e: KeyboardEvent) => void;
  onChangeTitle: (e: ChangeEvent) => void;
  onChangeTagName: (e: ChangeEvent) => void;
  onChangeCategory: (e: ChangeEvent) => void;
  setCategory: (category: string) => void;
  coverImageHandler: (e: SVGSVGElement) => void;
  onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
  clearCoverImage: () => void;
  photoInputRef: MutableRefObject<HTMLInputElement | null>;
}

const WritePostHeader = (props: Props) => {
  const {
    title,
    tagName,
    category,
    tags,
    photoInputRef,
    coverImg,
    addTag,
    deleteTag,
    onChangeTagName,
    onChangeTitle,
    onChangeCategory,
    setCategory,
    coverImageHandler,
    onChangeImage,
    clearCoverImage,
  } = props;

  const [state, openModal, closeModal] = useModal();

  return (
    <Header>
      <input type="text" value={title} onChange={onChangeTitle} placeholder="제목을 입력하세요" />
      <div id="line" />

      <div>
        <TagList>
          {tags[0] &&
            tags.map((tag: string) => (
              <StyledTag key={tag} onClick={deleteTag}>
                {tag}
              </StyledTag>
            ))}
          <input
            type="text"
            value={tagName}
            onChange={onChangeTagName}
            placeholder="태그를 입력하세요"
            onKeyDown={addTag}
          />
        </TagList>
      </div>
      <div>
        <input
          type="text"
          value={category}
          onChange={onChangeCategory}
          placeholder="카테고리를 입력하세요"
        />
        <button onClick={openModal}>카테고리 목록 보기</button>
        {state && <SelectCategories closeModal={closeModal} setCategory={setCategory} />}
      </div>
      <div>
        <span>커버 이미지</span>
        <div>
          {coverImg && <img src={coverImg} alt="coverImage" onClick={clearCoverImage} />}
          <ImageIcon onClick={coverImageHandler} />
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            ref={photoInputRef}
            style={{ display: "none" }}
            onChange={onChangeImage}
          />
        </div>
      </div>
    </Header>
  );
};

export default memo(WritePostHeader);
