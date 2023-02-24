import React from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { extractCritical } from "@emotion/server";

interface Props {
  styleTag: Array<React.ReactElement<null>>;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join("")}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="stylesheet" type="text/css" href="/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
