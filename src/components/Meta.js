import Head from "next/head";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";

const Meta = () => (
  <div>
    <Head>
      <title>certificate-web-ui</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto+Mono"
        rel="stylesheet"
      />
    </Head>
    <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"
    />
    <Global
      styles={css`
        :root {
          --font-monospace: "Roboto Mono", monospace;
          --font-monospace-size: 0.8rem !important;
        }

        body {
          background: white;
          font-family: arial, sans-serif;
          line-height: 1.5;
        }
      `}
    />
  </div>
);

export default Meta;
