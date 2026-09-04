module.exports = {
  exportPathMap: function exportMap() {
    return {
      "/": { page: "/" },
      "/deploy": { page: "/deploy" }
    };
  },
  assetPrefix: "",
  env: {
    GTM_CONTAINER_ID: process.env.GTM_CONTAINER_ID
  }
};
