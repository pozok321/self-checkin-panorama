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
          target: "https://ss.undangin.id/",
          changeOrigin: true,
        },
      },
      cssSourceMap: false,
    },
  };
