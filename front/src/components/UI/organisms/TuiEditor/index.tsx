import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

const TEditor = dynamic(() => import("./Editor"), { ssr: false });
const EditorWithForwardedRef = forwardRef<any | undefined, any>((props, ref) => (
  <TEditor {...props} forwardedRef={ref as React.MutableRefObject<any>} />
));

const TuiEditor = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css"
        />
        <link
          rel="stylesheet"
          href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github.min.css"
        />
      </Head>
      <>
        <EditorWithForwardedRef />
      </>
    </>
  );
};

export default TuiEditor;
