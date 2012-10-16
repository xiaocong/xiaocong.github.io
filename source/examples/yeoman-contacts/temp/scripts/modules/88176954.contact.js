
define(["jquery", "lodash", "backbone", "app"], function($, _, Backbone, app) {
  var Contact;
  Contact = app.module();
  Contact.Model = Backbone.Model.extend({
    defaults: {
      name: 'unamed',
      email: 'unamed@example.com'
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
  Contact.Collection = Backbone.Collection.extend({
    model: Contact.Model,
    url: "http://xiaocong.herokuapp.com/contacts/",
    parse: function(resp) {
      return resp.results;
    }
  });
  Contact.Views.Item = Backbone.LayoutView.extend({
    tagName: "div",
    className: "item",
    template: "contact/item",
    events: {
      click: "select"
    },
    serialize: function() {
      return this.model.toJSON();
    },
    initialize: function() {
      this.model.on("reset", this.render, this);
      this.model.on("change", this.render, this);
      return this.model.on("destroy", this.remove, this);
    },
    cleanup: function() {
      return this.model.off(null, null, this);
    },
    beforeRender: function() {
      if (this.model === app.active) {
        this.$el.siblings().removeClass("active");
        return this.$el.addClass("active");
      }
    },
    select: function() {
      return app.router.go("contacts", this.model.cid);
    }
  });
  Contact.Views.List = Backbone.LayoutView.extend({
    template: "contact/sidebar",
    className: "sidebar",
    keep: true,
    events: {
      "click footer button": "create",
      "click input": "filter",
      "keyup input": "filter"
    },
    initialize: function() {
      this.query = "";
      this.collection.on("reset", this.render, this);
      this.collection.on("add", this.render, this);
      return this.collection.on("remove", this.render, this);
    },
    cleanup: function() {
      return this.collection.off(null, null, this);
    },
    serialize: function() {
      return {
        collection: this.collection
      };
    },
    beforeRender: function() {
      return this.collection.each(function(contact) {
        var item;
        item = new Contact.Views.Item({
          model: contact
        });
        return this.insertView('.items', item);
      }, this);
    },
    create: function() {
      app.router.go("create");
      return false;
    },
    filter: function() {
      var query;
      query = $("input", this.el).val();
      this.getViews().each(function(view) {
        return view.$el.toggle(view.model.filter(query));
      });
      return false;
    }
  });
  Contact.Views.Show = Backbone.LayoutView.extend({
    template: "contact/show",
    className: "show",
    keep: true,
    events: {
      "click .edit": "edit"
    },
    serialize: function() {
      var _ref, _ref1;
      return (_ref = (_ref1 = app.active) != null ? _ref1.toJSON() : void 0) != null ? _ref : {
        name: "",
        email: ""
      };
    },
    beforeRender: function() {
      if (app.action === "show") {
        this.$el.siblings().removeClass("active");
        return this.$el.addClass("active");
      } else {
        return this.$el.removeClass("active");
      }
    },
    edit: function() {
      if (app.active) {
        return app.router.go("contacts", app.active.cid, "edit");
      }
    }
  });
  Contact.Views.Edit = Backbone.LayoutView.extend({
    template: "contact/edit",
    className: "edit",
    keep: true,
    events: {
      "submit form": "submit",
      "click .save": "submit",
      "click .delete": "remove"
    },
    serialize: function() {
      var _ref, _ref1;
      return (_ref = (_ref1 = app.active) != null ? _ref1.toJSON() : void 0) != null ? _ref : {
        name: "unamed",
        email: "unamed@example.com"
      };
    },
    beforeRender: function() {
      if (app.action === "edit" || app.action === "create") {
        this.$el.siblings().removeClass("active");
        return this.$el.addClass("active");
      } else {
        return this.$el.removeClass("active");
      }
    },
    submit: function() {
      var active;
      if (app.action === "edit") {
        active = app.active;
        app.active.set(this.form());
        app.active.save();
      } else if (app.action === "create") {
        active = new Contact.Model();
        active.set(this.form());
        app.router.contacts.add(active);
        active.save();
      }
      app.router.go("contacts", active.cid);
      return false;
    },
    form: function() {
      return {
        name: this.$("form [name=\"name\"]").val(),
        email: this.$("form [name=\"email\"]").val()
      };
    },
    remove: function() {
      var _ref;
      if ((_ref = app.active) != null) {
        _ref.destroy();
      }
      app.active = null;
      app.action = "";
      app.router.go("");
      return false;
    }
  });
  return Contact;
});
