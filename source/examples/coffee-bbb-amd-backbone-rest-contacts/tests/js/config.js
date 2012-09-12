
require.config({
  baseUrl: "../app",
  paths: {
    libs: "../assets/js",
    jquery: '../assets/js/jquery/1.7.2/jquery',
    underscore: '../assets/js/underscore/1.3.2/underscore',
    backbone: '../assets/js/backbone/0.9.2/backbone',
    text: '../assets/js/require/plugins/text',
    templates: '../assets/templates',
    spec: "../tests/js/spec"
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require(["../tests/js/runner"], function(runner) {
  return runner();
});
