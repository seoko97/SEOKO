import React from "react";

interface IProps {
  deletePost: () => void;
  routeEditPost: () => void;
}

const PostNavigation = ({ deletePost, routeEditPost }: IProps) => {
  return (
    <div>
      <button onClick={routeEditPost}>수정</button>
      <button onClick={deletePost}>삭제</button>
    </div>
  );
};

export default PostNavigation;
