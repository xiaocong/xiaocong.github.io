define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'views/sidebar',
  'views/main'
], function($, _, Backbone, sidebarView, mainView) {
  var AppView = Backbone.View.extend({
    className: 'contacts',
    initialize: function() {
      this.sidebar = sidebarView;
      this.main = mainView;
      this.vdiv = $('<div />').addClass('vdivide');
      this.render();
    },
    render: function() {
      this.$el.append(this.sidebar.render().el);
      this.$el.append(this.vdiv);
      this.$el.append(this.main.render().el);
      $('#article').append(this.el);
      return this;
    },
    show: function(item) {
      this.sidebar.active(item);
      this.main.show(item);
    },
    edit: function(item) {
      this.sidebar.active(item);
      this.main.edit(item);
    }
  });

  return new AppView();
});