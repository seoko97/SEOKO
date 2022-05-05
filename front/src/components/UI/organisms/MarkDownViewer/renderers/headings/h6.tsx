import React, { useEffect } from "react";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { setTocVar } from "@store/toc";

const h6: HeadingComponent = ({ children, level, node }) => {
  useEffect(() => {
    setTocVar({ level, text: children.toString() });
  }, []);
  return <h6 id={children.toString() + level}>{children}</h6>;
};

export default h6;
