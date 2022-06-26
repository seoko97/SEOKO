import React from "react";

interface IProps {
  onDelete: () => void;
  onEdit: () => void;
}

const PostNavigation = ({ onDelete, onEdit }: IProps) => {
  return (
    <div>
      <button onClick={onEdit}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};

export default PostNavigation;
