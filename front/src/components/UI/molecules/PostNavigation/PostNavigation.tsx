import Button from "@atoms/Button";
import styled from "@emotion/styled";
import React from "react";

interface IProps {
  onDelete: () => void;
  onEdit: () => void;
}

const PostNavigation = ({ onDelete, onEdit }: IProps) => {
  return (
    <Container>
      <Button buttonSize="small" onClick={onEdit}>
        수정
      </Button>
      <Button buttonSize="small" onClick={onDelete} buttonType="danger">
        삭제
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

export default PostNavigation;
