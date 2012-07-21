require.config({
  baseUrl: "../app",
  paths: {
    libs: "../assets/js",
    jquery: '../assets/js/jquery/1.7.2/jquery',
    underscore: '../assets/js/underscore/1.3.2/underscore',
    backbone: '../assets/js/backbone/0.9.2/backbone',
    text: '../assets/js/require/plugins/text',
    use: '../assets/js/require/plugins/use',
    templates: '../assets/templates',
    spec: "../tests/js/spec"
  },
  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },
    underscore: {
      attach: "_"
    }
  }
});
require(["../tests/js/runner"], function(runner) {
  return runner();
});