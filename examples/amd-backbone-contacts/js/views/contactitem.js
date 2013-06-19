define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'namespace',
  'text!templates/item.html'
], function($, _, Backbone, global, tplItem) {
  // contact item view
  var ContactItemView = Backbone.View.extend({
    className: 'item',
    template: _.template(tplItem),
    events: {
      'click': 'select'
    },
    // initialize
    initialize: function() {
      _.bindAll(this, 'select');
      this.model.bind('reset', this.render, this);
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
      if (this.model.view) this.model.view.remove();
      this.model.view = this;
    },
    // render the contact item
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    select: function() {
      if (global.app && global.app.router)
        global.app.router.navigate('contacts/' + this.model.cid, {
          trigger: true
        });
    },
    active: function() {
      this.$el.addClass('active');
    },
    deactive: function() {
      this.$el.removeClass('active');
    }
  });

  return ContactItemView;
});