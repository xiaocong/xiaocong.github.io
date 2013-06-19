
define(["domReady!", "jquery", "underscore", "backbone", "views/sidebar", "views/main"], function(doc, $, _, Backbone, sidebarView, mainView) {
  var AppView;
  AppView = Backbone.View.extend({
    className: "contacts",
    initialize: function() {
      this.sidebar = sidebarView;
      this.main = mainView;
      this.vdiv = $("<div />").addClass("vdivide");
      return this.render();
    },
    render: function() {
      this.$el.append(this.sidebar.render().el);
      this.$el.append(this.vdiv);
      this.$el.append(this.main.render().el);
      $("#article").append(this.el);
      return this;
    },
    show: function(item) {
      this.sidebar.active(item);
      return this.main.show(item);
    },
    edit: function(item) {
      this.sidebar.active(item);
      return this.main.edit(item);
    }
  });
  return new AppView();
});
