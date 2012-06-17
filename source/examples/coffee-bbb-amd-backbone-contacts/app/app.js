
define(['jquery', 'use!underscore', 'use!backbone', 'collections/contacts', 'router', 'views/app', 'namespace'], function($, _, Backbone, contacts, appRouter, appView, global) {
  var initialize;
  initialize = function() {
    global.app = {
      contacts: contacts,
      router: appRouter,
      view: appView
    };
    contacts.fetch();
    return Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
