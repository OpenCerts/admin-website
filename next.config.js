const withSass = require("@zeit/next-sass");

module.exports = withSass({
  analyzeBrowser: ["browser"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html"
    }
  },
  cssModules: true,
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/deploy": { page: "/deploy" }
    };
  },
  // Variables passed to both server and client
  publicRuntimeConfig: {
    network: process.env.NET
  }
});
