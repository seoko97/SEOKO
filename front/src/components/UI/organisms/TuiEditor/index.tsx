import React, { forwardRef, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Editor as EditorType, EditorProps } from "@toast-ui/react-editor";

import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import styled from "@emotion/styled";

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

interface Props extends EditorProps {
  onChange(value: string): void;

  valueType?: "markdown" | "html";
}

const TEditor = dynamic(() => import("./Editor"), { ssr: false });
const EditorWithForwardedRef = forwardRef<EditorType | undefined, EditorPropsWithHandlers>(
  (props, ref) => <TEditor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />,
);

const Container = styled.div`
  background-color: #fff;
  flex: 1;
  min-height: 700px;
`;

const TuiEditor = (props: Props) => {
  const {
    initialValue,
    previewStyle,
    height,
    initialEditType,
    useCommandShortcut,
    onChange,
    valueType,
  } = props;

  const editorRef = useRef<EditorType>();

  const handleChange = useCallback(() => {
    if (!editorRef.current) return;

    const instance = editorRef.current.getInstance();
    const valueTypeC = valueType || "markdown";

    onChange(valueTypeC === "markdown" ? instance.getMarkdown() : instance.getHTML());
  }, [props, editorRef]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.css" />
        <link
          rel="stylesheet"
          href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css"
        />
        <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
      </Head>
      <Container>
        <EditorWithForwardedRef
          {...props}
          initialValue={initialValue || "hello react editor world!"}
          previewStyle={previewStyle || "vertical"}
          height={height || "700px"}
          initialEditType={initialEditType || "markdown"}
          useCommandShortcut={useCommandShortcut || true}
          ref={editorRef}
          onChange={handleChange}
        />
      </Container>
    </>
  );
};

export default TuiEditor;
