
define(['use!underscore', 'use!backbone', 'models/contact', 'store'], function(_, Backbone, Contact, Store) {
  var Contacts;
  Contacts = Backbone.Collection.extend({
    model: Contact,
    localStorage: new Store('my-contacts')
  });
  return new Contacts();
});
