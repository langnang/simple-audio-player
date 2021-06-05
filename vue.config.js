module.exports = {
  outputDir: "dist",
  publicPath: process.env.NODE_ENV === "production" ? "/AudioPlayer/" : "/",
  devServer: {
    port: 8080, // 自定义端口
    proxy: {
      "/music.163": {
        target: "http://localhost:9019/music.163", // 你请求的第三方接口
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          // 路径重写，
          "^/music.163": "" // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Audio Player"; // 自定义标题
      return args;
    });
  }
};
