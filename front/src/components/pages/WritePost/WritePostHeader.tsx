import React, { MutableRefObject } from "react";
import styled from "@emotion/styled";

import Tag from "@atoms/Tag";
import ImageIcon from "@icons/ImageIcon/ImageIcon";

export const Container = styled.header`
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;

  & input[type="text"] {
    background-color: ${({ theme }) => theme.BACKGROUND_COLOR.PRIMARY_COLOR};
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

  & input[type="date"] {
    border: none;
    background: none;
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
    background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};
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
  tags: string[];
  coverImg: string | null;
  category: string;
  onSelectCategory: React.ChangeEventHandler;
  onChangeTagName: React.ChangeEventHandler;
  onChangeImage: React.ChangeEventHandler;
  onChangeTitle: React.ChangeEventHandler;
  addTag: React.KeyboardEventHandler;
  deleteTag: React.MouseEventHandler;
  coverImageHandler: React.MouseEventHandler;
  clearCoverImage: React.MouseEventHandler;
  photoInputRef: MutableRefObject<HTMLInputElement | null>;
}

const WritePostHeader = (props: Props) => {
  const {
    title,
    tags,
    photoInputRef,
    coverImg,
    category,
    addTag,
    deleteTag,
    onChangeTagName,
    onChangeTitle,
    coverImageHandler,
    onChangeImage,
    onSelectCategory,
    clearCoverImage,
  } = props;

  return (
    <Container>
      <div>
        <input
          type="text"
          name="title"
          defaultValue={title}
          onChange={onChangeTitle}
          placeholder="제목을 입력하세요"
        />
      </div>

      <div>
        <TagList>
          {tags.length >= 0 &&
            tags.map((tag: string) => (
              <Tag key={tag} onClick={deleteTag}>
                {tag}
              </Tag>
            ))}
          <input
            type="text"
            onChange={onChangeTagName}
            onKeyDown={addTag}
            placeholder="태그를 입력하세요"
          />
        </TagList>
      </div>
      <div>
        <select onChange={onSelectCategory} name="category" defaultValue={category}>
          <option value="dev">Dev</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      <div>
        <span>커버 이미지</span>
        <div>
          {coverImg && <img src={coverImg} alt="coverImage" onClick={clearCoverImage} />}
          <span onClick={coverImageHandler}>
            <ImageIcon />
          </span>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            ref={photoInputRef}
            style={{ display: "none" }}
            onChange={onChangeImage}
          />
        </div>
      </div>
    </Container>
  );
};

export default WritePostHeader;
