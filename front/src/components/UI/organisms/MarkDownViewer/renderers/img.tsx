import React from "react";
import NextImage from "next/future/image";
import { NormalComponents } from "react-markdown/lib/complex-types";
import styled from "@emotion/styled";

const IMAGE_BASE_URL = "image.toast.com";

const Img = styled(NextImage)`
  max-width: 100%;

  width: auto;
  height: auto;
  position: relative;
  box-shadow: ${({ theme }) => theme.BOX_SHADOW.PRIMARY};
  border-radius: 0.3rem;

  margin: 0 auto;
`;

const img: NormalComponents["img"] = (props, a) => {
  const { alt, src, node, children, placeholder, ...option } = props;

  const isInclude = src?.includes(IMAGE_BASE_URL);

  const altText = alt ?? "post_image";

  return isInclude ? (
    <Img src={src!} alt={altText} loading="lazy" {...option} width={1000} height={1000} />
  ) : (
    <img src={src!} alt={altText} {...option} />
  );
};

export default img;
