import React from "react";
import { Editor, EditorProps } from "@toast-ui/react-editor";
import Prism from "prismjs";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

export interface TUIEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const TUIEditor = (props: TUIEditorWithForwardedProps) => (
  <Editor
    plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
    {...props}
    ref={props.forwardedRef}
  />
);

export default TUIEditor;
