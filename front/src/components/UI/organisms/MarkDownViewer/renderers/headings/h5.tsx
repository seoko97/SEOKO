import React, { useEffect } from "react";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { setTocVar } from "@store/toc";

const h5: HeadingComponent = ({ children, level, node }) => {
  useEffect(() => {
    setTocVar({ level, text: children.toString() });
  }, []);
  return <h5 id={children.toString() + level}>{children}</h5>;
};

export default h5;
