import Head from "next/head";

const Meta = () => (
  <div>
    <Head>
      <title>OpenCerts - Admin Panel</title>
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
    `}</style>
  </div>
);

export default Meta;
