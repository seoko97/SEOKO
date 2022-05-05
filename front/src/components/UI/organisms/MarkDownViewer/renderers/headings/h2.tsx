import React, { useEffect } from "react";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { setTocVar } from "@store/toc";

const h2: HeadingComponent = ({ children, level, node }) => {
  useEffect(() => {
    setTocVar({ level, text: children.toString() });
  }, []);
  return <h2 id={children.toString() + level}>{children}</h2>;
};

export default h2;
