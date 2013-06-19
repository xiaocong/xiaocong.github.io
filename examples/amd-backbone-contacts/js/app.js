// Filename: app.js
define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'collections/contacts',
  'router',
  'views/app',
  'namespace'
], function($, _, Backbone, contacts, appRouter, appView, global){
  var initialize = function() {
    // assign global variable
    global.app = {
      contacts : contacts,
      router : appRouter,
      view : appView
    };
    // fetch data
    contacts.fetch();
    //start
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
