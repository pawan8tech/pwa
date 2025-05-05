const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.pexels.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/videos/search",
      },
      headers: {
        Authorization:
          "bD7ORaO3yiUHfkFfTBfv7PTt24srtOys37wOMt5VQs7D7m3fQ6IXvj9b",
      },
    })
  );
};
