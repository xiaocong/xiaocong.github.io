define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'collections/contacts',
  'models/contact',
  'views/contactitem',
  'namespace',
  'text!templates/sidebar.html'
], function($, _, Backbone, contacts, Contact, ContactItemView, global, tplSidebar) {
  // sidebar view
  var SidebarView = Backbone.View.extend({
    className: 'sidebar',
    template: _.template(tplSidebar),
    events: {
      'click footer button': 'create',
      'click input': 'filter',
      'keyup input': 'filter'
    },
    // initialize
    initialize: function() {
      _.bindAll(this, 'create', 'filter');
      this.model.bind('reset', this.renderAll, this);
      this.model.bind('add', this.add, this);
      this.model.bind('remove', this.remove, this);
    },
    // render the contact item
    render: function() {
      $(this.el).html(this.template());
      this.renderAll();
      return this;
    },
    renderAll: function() {
      this.$(".items").empty();
      this.model.each(this.renderOne, this);
      this.filter();
    },
    renderOne: function(contact) {
      var view = new ContactItemView({
        model: contact
      });
      this.$(".items").append(view.render().el);
    },
    create: function() {
      var contact = new Contact();
      this.model.add(contact);
      if (global.app && global.app.router)
        global.app.router.navigate('contacts/' + contact.cid + '/edit', {
          trigger: true
        });
    },
    filter: function() {
      var query = $('input', this.el).val();
      this.model.each(function(contact) {
        contact.view.$el.toggle(contact.filter(query));
      });
    },
    active: function(item) {
      if (this.activeItem) this.activeItem.view.deactive();
      this.activeItem = item;
      if (this.activeItem) this.activeItem.view.active();
    },
    add: function(contact) {
      this.renderOne(contact);
    },
    remove: function(contact) {
      console.log(contact);
    }
  });

  return new SidebarView({model: contacts});
});