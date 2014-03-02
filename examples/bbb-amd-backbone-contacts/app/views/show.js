define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'text!templates/show.html'
], function($, _, Backbone, tplShow) {
  // show selected contact details
  var ShowView = Backbone.View.extend({
    className: 'show',
    template: _.template(tplShow),
    events: {
      'click .edit': 'edit'
    },
    initialize: function() {
      _.bindAll(this, 'edit');
    },
    render: function() {
      if (this.item)
        this.$el.html(this.template(this.item.toJSON()));
      else
        this.$el.html('');
      return this;
    },
    change: function(item) {
      this.item = item;
      this.render();
    },
    edit: function() {
      if (this.item)
        Backbone.history.navigate('contacts/' + this.item.cid + '/edit', {
          trigger: true
        });
    }
  });

  return new ShowView();
});