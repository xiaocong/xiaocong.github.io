// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],
  
  paths: {
    // JavaScript folders
    libs: "../assets/js",
    // Libraries
    jquery: '../assets/js/jquery/1.7.2/jquery',
    underscore: '../assets/js/underscore/1.3.2/underscore',
    backbone: '../assets/js/backbone/0.9.2/backbone',
    // requirejs plugins
    text: '../assets/js/require/plugins/text',
    use: '../assets/js/require/plugins/use',
    //order: 'libs/require/plugins/order',
    //template
    templates: '../assets/templates'
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
