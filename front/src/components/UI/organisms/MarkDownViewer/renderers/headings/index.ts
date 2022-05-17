import { Components } from "react-markdown";
import { ReactMarkdownNames, HeadingComponent } from "react-markdown/lib/ast-to-react";

import heading from "./headings";

interface IHeading {
  [key: string]: HeadingComponent | ReactMarkdownNames;
}

export const headings: Components = ["h1", "h2", "h3", "h4", "h5", "h6"].reduce<IHeading>(
  (acc, tagname) => {
    acc[tagname] = heading;
    return acc;
  },
  {},
);
