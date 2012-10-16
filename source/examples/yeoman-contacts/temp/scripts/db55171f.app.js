
define(["jquery", "lodash", "backbone", "plugins/backbone.layoutmanager"], function($, _, Backbone) {
  var JST, app;
  app = {
    root: "./"
  };
  JST = window.JST = window.JST || {};
  Backbone.LayoutManager.configure({
    manage: true,
    paths: {
      layout: "templates/layouts/",
      template: "templates/"
    },
    fetch: function(path) {
      path = path + ".html";
      if (!JST[path]) {
        $.ajax({
          url: app.root + path,
          async: false
        }).then(function(contents) {
          return JST[path] = _.template(contents);
        });
      }
      return JST[path];
    }
  });
  return _.extend(app, {
    module: function(additionalProps) {
      return _.extend({
        Views: {}
      }, additionalProps);
    },
    useLayout: function(name) {
      var layout;
      if (this.layout && this.layout.options.template === name) {
        return this.layout;
      }
      if (this.layout) {
        this.layout.remove();
      }
      layout = new Backbone.Layout({
        template: name,
        className: "contacts",
        id: "layout"
      });
      $("#article").empty().append(layout.el);
      layout.render();
      this.layout = layout;
      return layout;
    }
  }, Backbone.Events);
});
