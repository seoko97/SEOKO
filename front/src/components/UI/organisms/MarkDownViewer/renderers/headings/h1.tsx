import React, { useEffect } from "react";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { setTocVar } from "@store/toc";

const h1: HeadingComponent = ({ children, level, node }) => {
  useEffect(() => {
    setTocVar({ level, text: children.toString() });
  }, []);

  return <h1 id={children.toString() + level}>{children}</h1>;
};

export default h1;
