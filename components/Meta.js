import Head from "next/head";

const Meta = () => (
  <div>
    <Head>
      <title>OpenCerts Admin Panel</title>
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
    <script defer src="https://use.fontawesome.com/releases/v5.8.1/js/all.js" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"
    />
    <style jsx global>{`
      :root {
        font: "Source Sans Pro", sans-serif;
        --font-monospace: "Source Sans Pro", sans-serif;
        --font-monospace-size: 0.8rem !important;
        -webkit-font-smoothing: antialiased;
      }
      .btn {
        font-family: source sans pro;
      }

      body {
        background: white;
        font-family: "Source Sans Pro", sans-serif;
        line-height: 1.5;
        margin: 0px;
      }
      .navbar-toggler {
        position: absolute;
        right: 30px;
      }
      .main {
        max-width: 1280px;
        display: flex;
        justify-content: flex-start;
        margin: 0 auto;
        width: 100%;
        padding: 2rem;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Montserrat";
      }
      .bg-light {
        background-color: #f7fafc !important;
      }
      .exact-print {
        -webkit-print-color-adjust: exact;
      }
      .print-only {
        display: none;
      }
      .screen-only {
        display: block;
      }
      @media print {
        .print-only {
          display: block;
        }
        .screen-only {
          display: none;
        }
      }
      .bg-brand-dark {
        background-color: #324353;
        -webkit-print-color-adjust: exact;
      }
      .text-red {
        color: #ff5268;
      }
      .text-blue {
        color: #099de3;
      }
      .text-orange {
        color: #ffb152;
      }
      .text-green {
        color: #00c04a;
      }
      .text-brand-dark {
        color: #324353;
      }
      li.slanted-tab {
        background-color: transparent;
        border-color: transparent;
        z-index: 1;
        position: relative;
        display: inline-block;
        padding: 1.5em 1.5em 1em;
        color: inherit;
        text-decoration: none;
        margin: 0 -7px;
      }
      ul.navbar-nav > li.nav-item > a.nav-link::hover {
        color: #fff !important;
      }
      ul.navbar-nav > li.nav-item > a.nav-link.active {
        font-family: Montserrat;
        color: #fff !important;
      }
      li.slanted-tab::before {
        content: ""; /* To generate the box */
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0.5em;
        left: 0;
        z-index: -1;
        border-bottom: none;
        border-radius: 10px 10px 0 0;
        background: #ddd;
        box-shadow: 0 2px hsla(0, 0%, 100%, 0.5) inset;
        transform: perspective(5px) rotateX(2deg);
        transform-origin: bottom;
      }
      li.slanted-tab.active::before {
        background: #aaa;
        -webkit-print-color-adjust: exact;
      }
      li.slanted-tab.active {
        z-index: 2;
      }
      .fill {
        min-height: 100%;
        min-height: 100vh;
      }
      .pointer {
        cursor: pointer;
      }
      .bg-red {
        background: #ff6565;
      }
      .no-padding {
        padding: 0 !important;
      }
      .noselect {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }

      a:visited {
        color: inherit;
      }

      input[type="text"] {
        font-family: var(--font-monospace) !important;
        font-size: var(--font-monospace-size);
        border: solid 1px black;
        padding: 0.5rem; // tachyons pa2
      }

      .button,
      button {
        cursor: pointer;
        background-color: "#FBA54F";
        // border: solid 2px black;
        border-radius: 50px;
        padding: 1rem 2rem; // tachyons pa3
        user-select: none;
        text-decoration: none;
        color: "#fff";
      }

      .button:hover,
      button:hover {
        background-color: "#FBA54F";
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
    `}</style>
  </div>
);

export default Meta;
