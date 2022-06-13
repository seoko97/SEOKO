import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { MarkdownWrapper } from "./styles";

import renderers from "./renderers";

interface Props {
  content: string;
}

const MarkDownViewer = ({ content }: Props) => {
  return (
    <MarkdownWrapper>
      <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={renderers}>
        {content}
      </Markdown>
    </MarkdownWrapper>
  );
};

export default MarkDownViewer;
