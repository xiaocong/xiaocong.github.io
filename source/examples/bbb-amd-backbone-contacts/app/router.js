// Filename: router.js
define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'collections/contacts',
  'views/app'
], function($, _, Backbone, contacts, appView) {
  //Router
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'show',
      'contacts/:id': 'show',
      'contacts/:id/edit': 'edit'
    },

    show: function(id) {
      appView.show(this.getContact(id));
    },
    edit: function(id) {
      appView.edit(this.getContact(id));
    },
    getContact: function(id) {
      if (typeof(id) === 'undefined' || id === null)
        if (contacts.length > 0)
          return contacts.at(0);
      return contacts.getByCid(id);
    }
  });

  return new AppRouter();
});
