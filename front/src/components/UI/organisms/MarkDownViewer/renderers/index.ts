import { Components } from "react-markdown";
import code from "./code";
import blockquote from "./blockquote";
import { headings } from "./headings";

const renderers: Components = {
  code,
  blockquote,
  ...headings,
};

export default renderers;
