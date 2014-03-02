define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'views/show',
  'views/edit'
], function($, _, Backbone, showView, editView) {
  // main view for show and view
  var MainView = Backbone.View.extend({
    className: 'main stack',
    initialize: function() {
      this.editView = editView;
      this.showView = showView;
    },
    render: function() {
      this.$el.append(this.showView.render().el);
      this.$el.append(this.editView.render().el);
      return this;
    },
    edit: function(item) {
      this.showView.$el.removeClass('active');
      this.editView.$el.addClass('active');
      this.editView.change(item);
    },
    show: function(item) {
      this.editView.$el.removeClass('active');
      this.showView.$el.addClass('active');
      this.showView.change(item);
    }
  });

  return new MainView();
});