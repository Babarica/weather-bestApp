module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/weather-bestApp/" : "/",
  chainWebpack: (config) => {
    config.resolve.alias.set("vue-slick", "vue-slick/dist/vue-slick.js");
  },
};
