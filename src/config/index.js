module.exports = {
    build: {
      //magic stuff
    },
    dev: {
      // env: require('./dev.env'),
      port: 5173,
      autoOpenBrowser: true,
      assetsSubDirectory: "static",
      assetsPublicPath: "/",
      proxyTable: {
        "/api": {
          target: "https://private.undangin.id/",
          changeOrigin: true,
        },
      },
      cssSourceMap: false,
    },
  };
