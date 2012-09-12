
define(['underscore', 'backbone', 'models/contact'], function(_, Backbone, Contact) {
  var Contacts;
  Contacts = Backbone.Collection.extend({
    model: Contact,
    url: 'http://xiaocong.herokuapp.com/contacts/',
    parse: function(resp) {
      return resp.results;
    }
  });
  return new Contacts();
});
