
define(["jquery", "use!underscore", "use!backbone", "collections/contacts", "models/contact", "views/contactitem", "text!templates/sidebar.html"], function($, _, Backbone, contacts, Contact, ContactItemView, tplSidebar) {
  var SidebarView;
  SidebarView = Backbone.View.extend({
    className: "sidebar",
    template: _.template(tplSidebar),
    events: {
      "click footer button": "create",
      "click input": "filter",
      "keyup input": "filter"
    },
    initialize: function() {
      _.bindAll(this, "create", "filter");
      this.model.bind("reset", this.renderAll, this);
      this.model.bind("add", this.add, this);
      return this.model.bind("remove", this.remove, this);
    },
    render: function() {
      $(this.el).html(this.template());
      this.renderAll();
      return this;
    },
    renderAll: function() {
      this.$(".items").empty();
      this.model.each(this.renderOne, this);
      return this.filter();
    },
    renderOne: function(contact) {
      var view;
      view = new ContactItemView({
        model: contact
      });
      return this.$(".items").append(view.render().el);
    },
    create: function() {
      var contact;
      contact = new Contact();
      this.model.add(contact);
      return Backbone.history.navigate("contacts/" + contact.cid + "/edit", {
        trigger: true
      });
    },
    filter: function() {
      var query;
      query = $("input", this.el).val();
      return this.model.each(function(contact) {
        return contact.view.$el.toggle(contact.filter(query));
      });
    },
    active: function(item) {
      if (this.activeItem) this.activeItem.view.deactive();
      this.activeItem = item;
      if (this.activeItem) return this.activeItem.view.active();
    },
    add: function(contact) {
      return this.renderOne(contact);
    },
    remove: function(contact) {
      return console.log(contact);
    }
  });
  return new SidebarView({
    model: contacts
  });
});
