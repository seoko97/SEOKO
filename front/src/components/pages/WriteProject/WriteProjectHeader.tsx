import React, { MouseEvent, MutableRefObject } from "react";
import { Container } from "@pages/WritePost/WritePostHeader";
import ImageIcon from "@icons/ImageIcon";

type ChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;

interface IProps {
  title: string;
  description: string;
  coverImg: string;
  githubUrl: string;
  startDate: string;
  endDate: string;
  photoInputRef: MutableRefObject<HTMLInputElement | null>;
  onChangeImage: ChangeEventHandler;
  onChangeValue: ChangeEventHandler;
  coverImageHandler: (e: MouseEvent) => void;
  clearCoverImage: () => void;
}

const WriteProjectHeader = (props: IProps) => {
  const {
    title,
    description,
    githubUrl,
    coverImg,
    startDate,
    endDate,
    photoInputRef,
    onChangeValue,
    onChangeImage,
    clearCoverImage,
    coverImageHandler,
  } = props;

  return (
    <Container>
      <input
        name="title"
        type="text"
        defaultValue={title}
        onChange={onChangeValue}
        placeholder="제목을 입력하세요"
      />
      <input
        name="description"
        type="text"
        defaultValue={description}
        onChange={onChangeValue}
        placeholder="소개를 입력하세요"
      />
      <input
        name="githubUrl"
        type="text"
        defaultValue={githubUrl}
        onChange={onChangeValue}
        placeholder="깃허브 주소를 입력하세요"
      />
      <div>
        <span>프로젝트 시작 날짜 : </span>
        <input
          name="startDate"
          type="date"
          placeholder="YYYY-MM-DD"
          defaultValue={startDate}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <span>프로젝트 종료 날짜 : </span>
        <input
          name="endDate"
          type="date"
          placeholder="YYYY-MM-DD"
          defaultValue={endDate}
          onChange={onChangeValue}
        />
      </div>
      <div id="line" />
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

export default WriteProjectHeader;
