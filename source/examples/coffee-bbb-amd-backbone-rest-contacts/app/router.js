
define(['jquery', 'use!underscore', 'use!backbone', 'collections/contacts', 'views/app'], function($, _, Backbone, contacts, appView) {
  var AppRouter;
  AppRouter = Backbone.Router.extend({
    routes: {
      '': 'show',
      'contacts/:id': 'show',
      'contacts/:id/edit': 'edit'
    },
    show: function(id) {
      return appView.show(this.getContact(id));
    },
    edit: function(id) {
      return appView.edit(this.getContact(id));
    },
    getContact: function(id) {
      if (typeof id !== 'undefined' && id !== null) {
        return contacts.getByCid(id);
      } else if (contacts.length > 0) {
        return contacts.at(0);
      }
    }
  });
  return new AppRouter();
});
