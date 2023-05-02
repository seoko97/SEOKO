import { Components } from "react-markdown";
import code from "./code";
import blockquote from "./blockquote";
import img from "./img";
import { headings } from "./headings";

const renderers: Components = {
  code,
  blockquote,
  img,
  ...headings,
};

export default renderers;
