
require.config({
  deps: ["main"],
  paths: {
    libs: "../scripts/libs",
    plugins: "../scripts/plugins",
    jquery: "../scripts/libs/jquery",
    lodash: "../scripts/libs/lodash",
    backbone: "../scripts/libs/backbone"
  },
  shim: {
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },
    "plugins/backbone.layoutmanager": ["backbone"]
  }
});
