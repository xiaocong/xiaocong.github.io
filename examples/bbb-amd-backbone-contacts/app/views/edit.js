define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'text!templates/edit.html'
], function($, _, Backbone, tplEdit) {
  // edit selected contact
  var EditView = Backbone.View.extend({
    className: 'edit',
    template: _.template(tplEdit),
    events: {
      'submit form': 'submit',
      'click .save': 'submit',
      'click .delete': 'remove'
    },
    initialize: function() {
      _.bindAll(this, 'submit', 'remove');
    },
    render: function() {
      if (this.item) this.$el.html(this.template(this.item.toJSON()));
      return this;
    },
    change: function(item) {
      this.item = item;
      this.render();
    },
    submit: function() {
      this.item.set(this.form());
      this.item.save();
      Backbone.history.navigate('contacts/' + this.item.cid, {
        trigger: true
      });
      return false;
    },
    form: function() {
      return {
        name: this.$('form [name="name"]').val(),
        email: this.$('form [name="email"]').val()
      };
    },
    remove: function() {
      this.item.destroy();
      this.item = null;
      Backbone.history.navigate('', {
        trigger: true
      });
    }
  });

  return new EditView();
});