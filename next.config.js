const isProd = process.env.NODE_ENV === "production";

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // fix for 'fs' missing error
    config.node = {
        fs: 'empty'
    }
    return config
},
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/admin": { page: "/admin" }
    };
  },
  assetPrefix: isProd ? "/certificate-web-ui" : ""
};
