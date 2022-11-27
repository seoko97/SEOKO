import styled from "@emotion/styled";

export const MarkdownWrapper = styled.div`
  width: 100%;
  overflow-wrap: anywhere;

  user-select: text;
  font-size: 1rem;

  & > :first-child {
    margin-top: 0;
  }

  & td {
    border: 1px solid #ccc;
  }

  & > * {
    line-height: 2;
  }

  & pre {
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
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    overflow-wrap: anywhere;
  }

  & > p,
  & > ul,
  & > ol,
  & table,
  & blockquote,
  & pre,
  & img {
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
    margin-top: 64px;
    font-size: 2em;
  }
  h2 {
    margin-top: 64px;
    margin-bottom: 24px;
    font-size: 1.6em;
  }
  h3 {
    margin-top: 48px;
    margin-bottom: 24px;
    font-size: 1.35em;
  }
  h4 {
    margin-top: 36px;
    margin-bottom: 24px;
    font-size: 1.25em;
  }
  h5 {
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 1.1em;
  }
  h6 {
    margin-top: 24px;
    font-size: 1em;
  }
  & img {
    max-width: 100%;
    border-radius: 10px;
    margin: 0 auto;
  }

  & a {
    color: #00bfa5;
    &:hover {
      text-decoration: underline;
    }
  }
`;
