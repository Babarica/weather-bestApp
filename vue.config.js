module.exports = {
  lintOnSave: false,

  chainWebpack: (config) => {
    config.resolve.alias.set("vue-slick", "vue-slick/dist/vue-slick.js");
  },
};
