import Head from "next/head";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import { faintBlue } from "../styles/variables";

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
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
        rel="stylesheet"
        type="text/css"
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
          font: "Source Sans Pro", sans-serif;
          --font-monospace: "Source Sans Pro", sans-serif;
          --font-monospace-size: 0.8rem !important;
          -webkit-font-smoothing: antialiased;
        }

        body {
          background: ${faintBlue};
          font-family: "Source Sans Pro", sans-serif;
          line-height: 1.5;
        }

        .provider-selector {
          border-width: 0;
          border-radius: 0;
          outline: none;
        }

        .noselect {
          user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
        }

        a:visited {
          color: inherit;
        }

        .button,
        button {
          cursor: pointer;
          background: transparent;
          border: solid 2px black;
          padding: 1rem; // tachyons pa3
          user-select: none;
          text-decoration: none;
          color: inherit;
        }

        .button:hover,
        button:hover {
          background-color: gold;
        }

        .button:active,
        button:active {
          background-color: black;
          color: white;
        }

        .button:disabled,
        button:disabled {
          opacity: 0.7;
          pointer-events: none;
        }

        .button.danger,
        button.danger {
          color: #e7040f;
          border-color: #e7040f;
        }

        .button.danger:hover,
        button.danger:hover {
          color: white;
          background-color: #e7040f;
        }

        .__hashcolor > input {
          font-family: inherit;
          color: inherit;
        }
      `}
    />
  </div>
);

export default Meta;
