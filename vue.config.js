module.exports = {
  outputDir: "dist",
  publicPath: process.env.NODE_ENV === "production" ? "/AudioPlayer/" : "/",
  devServer: {
    port: 9505, // 自定义端口
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Audio Player"; // 自定义标题
      return args;
    });
  },
};
