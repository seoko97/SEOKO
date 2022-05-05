import React, { useEffect } from "react";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { setTocVar } from "@store/toc";

const h3: HeadingComponent = ({ children, level, node }) => {
  useEffect(() => {
    setTocVar({ level, text: children.toString() });
  }, []);
  return <h3 id={children.toString() + level}>{children}</h3>;
};

export default h3;
