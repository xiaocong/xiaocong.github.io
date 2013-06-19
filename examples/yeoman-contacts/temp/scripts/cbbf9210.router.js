
define(["app", "modules/contact"], function(app, Contact) {
  var Router;
  Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "contacts/:id/edit": "edit",
      "create": "create",
      "contacts/:id": "show"
    },
    index: function() {
      this.reset();
      return app.useLayout("main").render();
    },
    show: function(id) {
      app.active = this.contacts.getByCid(id);
      app.action = "show";
      return app.useLayout("main").render();
    },
    edit: function(id) {
      app.active = this.contacts.getByCid(id);
      app.action = "edit";
      return app.useLayout("main").render();
    },
    create: function() {
      app.active = null;
      app.action = "create";
      return app.useLayout("main").render();
    },
    go: function() {
      return this.navigate(_.toArray(arguments).join("/"), true);
    },
    reset: function() {
      app.active = null;
      return app.action = "";
    },
    initialize: function() {
      this.contacts = new Contact.Collection();
      this.sidebar = new Contact.Views.List({
        collection: this.contacts
      });
      this.show = new Contact.Views.Show();
      this.edit = new Contact.Views.Edit();
      app.useLayout("main");
      app.layout.setViews({
        ".sidebar": this.sidebar
      });
      return app.layout.insertViews({
        ".main": [this.show, this.edit]
      });
    }
  });
  return Router;
});
