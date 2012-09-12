
define(['underscore', 'backbone'], function(_, Backbone) {
  var Contact;
  Contact = Backbone.Model.extend({
    defaults: {
      name: 'unamed',
      email: ''
    },
    filter: function(query) {
      if (typeof query !== "string") {
        return true;
      } else {
        query = query.toLowerCase();
        return this.get("name").toLowerCase().indexOf(query) !== -1 || this.get("email").toLowerCase().indexOf(query) !== -1;
      }
    }
  });
  return Contact;
});
