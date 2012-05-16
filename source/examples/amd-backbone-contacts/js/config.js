// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],
  
  paths: {
    // JavaScript folders
    libs: "libs",
    // Libraries
    jquery: 'libs/jquery/1.7.2/jquery',
    underscore: 'libs/underscore/1.3.2/underscore',
    backbone: 'libs/backbone/0.9.2/backbone',
    // requirejs plugins
    text: 'libs/require/plugins/text',
    use: 'libs/require/plugins/use',
    order: 'libs/require/plugins/order',
    //template
    templates: '../templates'
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
