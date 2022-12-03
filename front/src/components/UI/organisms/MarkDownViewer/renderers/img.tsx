import React from "react";
import styled from "@emotion/styled";

import NextImage from "next/image";
import { Element } from "react-markdown/lib/ast-to-react";

interface IProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  node?: Element;
}

const image = ({ node, children, ...props }: IProps) => {
  const src = props.src as string;

  return (
    <>
      <Container>
        <NextImage
          {...props}
          src={src}
          layout="fill"
          placeholder="blur"
          blurDataURL={src}
          objectFit="contain"
          loading="lazy"
        />
      </Container>
      <p>{props.alt}</p>
    </>
  );
};

const Container = styled.div`
  max-width: 90%;
  padding-top: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: 0 auto;

  & + p {
    text-align: center;
    font-size: 0.8em;
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }
`;

export default image;
