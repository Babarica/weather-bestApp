module.exports = {
  lintOnSave: false,
  publicPath: "/weather-bestApp/",
  chainWebpack: (config) => {
    config.resolve.alias.set("vue-slick", "vue-slick/dist/vue-slick.js");
  },
};
