import React from "react";

import NextImage, { ImageProps } from "next/future/image";
import styled from "@emotion/styled";

const Img = styled(NextImage)`
  position: relative;

  max-width: 100%;
  height: auto;
  aspect-ratio: 130 / 100;

  border-radius: 1rem;

  object-fit: cover;
  border-radius: 10px;
`;

const Image = ({ width, height, ...props }: ImageProps) => {
  return (
    <Img
      {...props}
      quality={100}
      width={props.fill ? undefined : width ?? 1000}
      height={props.fill ? undefined : height ?? 1000}
    />
  );
};

export default Image;
