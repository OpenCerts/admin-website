const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer(
  withSass({
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
        "/panel": { page: "/adminPage" }
      };
    },
    publicRuntimeConfig: {
      network: process.env.NET
    },
    assetPrefix: ""
  })
);
