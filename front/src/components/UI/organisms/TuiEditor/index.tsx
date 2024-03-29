import React, { forwardRef, memo, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Editor as EditorType, EditorProps } from "@toast-ui/react-editor";

import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import styled from "@emotion/styled";

import { useMutation } from "@apollo/client";
import { IAddImage } from "@queries-types/image";
import { ADD_IMAGE } from "@queries/image/addImage.queries";

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
  const [addImageMutation] = useMutation<IAddImage>(ADD_IMAGE);

  const handleChange = useCallback(() => {
    if (!editorRef.current) return;

    const instance = editorRef.current.getInstance();
    const valueTypeC = valueType || "markdown";

    const content = valueTypeC === "markdown" ? instance.getMarkdown() : instance.getHTML();

    onChange(content);
  }, [props, editorRef]);

  const addImageBlobHook = useCallback(async (blob, callback) => {
    const { data } = await addImageMutation({
      variables: {
        input: {
          type: "post",
          image: blob,
        },
      },
    });

    if (!data) return;

    callback(data.addImage.image, blob.name);
  }, []);

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
          initialValue={initialValue || ""}
          previewStyle={previewStyle || "vertical"}
          height={height || "1000px"}
          initialEditType={initialEditType || "markdown"}
          useCommandShortcut={useCommandShortcut || true}
          ref={editorRef}
          onChange={handleChange}
          hooks={{ addImageBlobHook }}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  flex: 1;
  min-height: 1000px;
`;

export default memo(TuiEditor);
