const isProd = process.env.NODE_ENV === "production";

module.exports = {
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
    };
  },
  assetPrefix: isProd ? "/certificate-web-ui" : "",
};
