define([
  'use!underscore',
  'use!backbone'
], function(_, Backbone) {
  var Contact = Backbone.Model.extend({
    defaults: {
      name: 'unamed',
      email: ''
    },
    filter: function(query) {//helper function for user search
      if (typeof(query) === 'undefined' || query === null || query === '') return true;
      query = query.toLowerCase();
      return this.get('name').toLowerCase().indexOf(query) != -1 || this.get('email').toLowerCase().indexOf(query) != -1;
    }
  });
  return Contact;
});