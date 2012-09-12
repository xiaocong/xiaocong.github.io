
require.config({
  deps: ["main"],
  paths: {
    'libs': "../assets/js",
    'jquery': '../assets/js/jquery/1.7.2/jquery',
    'underscore': '../assets/js/underscore/1.3.2/underscore',
    'backbone': '../assets/js/backbone/0.9.2/backbone',
    'text': '../assets/js/require/plugins/text',
    'domReady': '../assets/js/require/plugins/domReady',
    'templates': '../assets/templates'
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
