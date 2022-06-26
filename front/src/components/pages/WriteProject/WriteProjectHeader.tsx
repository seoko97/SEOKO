import React, { ChangeEvent, memo, MouseEvent, MutableRefObject } from "react";
import { Header } from "@pages/WritePost/WritePostHeader";
import ImageIcon from "@icons/ImageIcon";

interface IProps {
  title: string;
  description: string;
  coverImg: string;
  githubUrl: string;
  startDate: string;
  endDate: string;
  photoInputRef: MutableRefObject<HTMLInputElement | null>;
  onChangeTitle: (e: ChangeEvent) => void;
  onChangeDec: (e: ChangeEvent) => void;
  onChangeGithubUrl: (e: ChangeEvent) => void;
  onChangeDate: (e: ChangeEvent) => void;
  coverImageHandler: (e: MouseEvent) => void;
  onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
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
    onChangeDate,
    onChangeDec,
    onChangeTitle,
    onChangeGithubUrl,
    onChangeImage,
    clearCoverImage,
    coverImageHandler,
  } = props;

  return (
    <Header>
      <input type="text" value={title} onChange={onChangeTitle} placeholder="제목을 입력하세요" />
      <input
        type="text"
        value={description}
        onChange={onChangeDec}
        placeholder="소개를 입력하세요"
      />
      <input
        type="text"
        value={githubUrl}
        onChange={onChangeGithubUrl}
        placeholder="깃허브 주소를 입력하세요"
      />
      <div>
        <span>프로젝트 시작 날짜 : </span>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          name="startDate"
          defaultValue={startDate}
          onChange={onChangeDate}
        />
      </div>
      <div>
        <span>프로젝트 종료 날짜 : </span>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          name="endDate"
          defaultValue={endDate}
          onChange={onChangeDate}
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
    </Header>
  );
};

export default memo(WriteProjectHeader);
