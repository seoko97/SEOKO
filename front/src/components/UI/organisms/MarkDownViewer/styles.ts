import styled from "@emotion/styled";

export const MarkdownWrapper = styled.div`
  width: 100%;
  overflow-wrap: anywhere;

  user-select: text;
  font-size: 0.9rem;

  & > *:first-child {
    margin-top: 0;
  }

  & > p {
    position: relative;
  }

  & td {
    border: 1px solid #ccc;
  }

  & > * {
    line-height: 1.7;
  }

  & pre {
    transition: color 0.3s;

    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    border-radius: 1.7;
    overflow-wrap: anywhere;

    & .token {
      background: none;
    }
  }

  & ul {
    list-style: disc;
  }

  & ol {
    list-style: decimal;
  }

  & ul,
  ol {
    padding-left: 32px;
  }

  & li {
    margin-bottom: 12px;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  td,
  ul,
  ol {
    transition: color 0.3s;

    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    overflow-wrap: anywhere;
  }

  & > p,
  & > ul,
  & > ol,
  & table,
  & blockquote,
  & pre {
    margin-bottom: 24px;
  }
  & h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 700;
    margin: 11px 0px 4px;
  }

  h1 {
    margin-top: 3em;
    font-size: 2em;
  }
  h2 {
    margin-top: 2.7em;
    margin-bottom: 1.5em;
    font-size: 1.6em;
  }
  h3 {
    margin-top: 2.4em;
    margin-bottom: 1.2em;
    font-size: 1.35em;
  }
  h4 {
    margin-top: 2.1em;
    margin-bottom: 1em;
    font-size: 1.25em;
  }
  h5 {
    margin-top: 2.1em;
    margin-bottom: 1em;
    font-size: 1.1em;
  }
  h6 {
    margin-top: 2.1em;
    font-size: 1em;
  }

  & > p:has(> img) {
    display: flex;
  }

  & a {
    color: #00bfa5;
    &:hover {
      text-decoration: underline;
    }
  }
`;
