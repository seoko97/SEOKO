import React, { useEffect } from "react";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { setTocVar } from "@store/toc";
import { getClassNameByToc } from "@lib/getClassNameByToc";

const heading: HeadingComponent = ({ children, level, node }) => {
  useEffect(() => {
    setTocVar({ level, text: children.toString(), line: node.position?.start.line || 0 });
  }, []);

  return React.createElement(
    node.tagName,
    { id: getClassNameByToc(node.position?.start.line || 0, level) },
    children,
  );
};

export default heading;
