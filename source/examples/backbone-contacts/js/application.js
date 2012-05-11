(function($) {
  $(document).ready(function(){
    var Contact = Backbone.Model.extend({
      defaults: {
        name: '',
        email: ''
      },
      filter: function(query) {
        if (query === undefined || query === null || query === '') return true;
        query = query.toLowerCase();
        return this.get('name').toLowerCase().indexOf(query) != -1 || this.get('email').toLowerCase().indexOf(query) != -1;
      }
    });

    var Contacts = Backbone.Collection.extend({
      model: Contact,
      localStorage: new Store('my-contacts')
    });

    // contact item view
    var ContactItemView = Backbone.View.extend({
      className: 'item',
      template: _.template($('#tpl-item').html()),
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
        appRouter.navigate('contacts/' + this.model.cid, {
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

    // sidebar view
    var SidebarView = Backbone.View.extend({
      className: 'sidebar',
      template: _.template($('#tpl-sidebar').html()),
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
        appRouter.navigate('contacts/' + contact.cid + '/edit', {
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
    // show selected contact details
    var ShowView = Backbone.View.extend({
      className: 'show',
      template: _.template($('#tpl-show').html()),
      events: {
        'click .edit': 'edit'
      },
      initialize: function() {
        _.bindAll(this, 'edit');
      },
      render: function() {
        if (this.item) this.$el.html(this.template(this.item.toJSON()));
        return this;
      },
      change: function(item) {
        this.item = item;
        this.render();
      },
      edit: function() {
        if (this.item)
          appRouter.navigate('contacts/' + this.item.cid + '/edit', {
            trigger: true
          });
      }
    });
    // edit selected contact
    var EditView = Backbone.View.extend({
      className: 'edit',
      template: _.template($('#tpl-edit').html()),
      events: {
        'submit form': 'submit',
        'click .save': 'submit',
        'click .delete': 'remove'
      },
      initialize: function() {
        _.bindAll(this, 'submit', 'remove');
      },
      render: function() {
        if (this.item) this.$el.html(this.template(this.item.toJSON()));
        return this;
      },
      change: function(item) {
        this.item = item;
        this.render();
      },
      submit: function() {
        this.item.set(this.form());
        this.item.save();
        appRouter.navigate('contacts/' + this.item.cid, {
          trigger: true
        });
        return false;
      },
      form: function() {
        return {
          name: this.$('form [name="name"]').val(),
          email: this.$('form [name="email"]').val()
        };
      },
      remove: function() {
        this.item.destroy();
        this.item = null;
        appRouter.navigate('', {
          trigger: true
        });
      }
    });
    // main view for show and view
    var MainView = Backbone.View.extend({
      className: 'main stack',
      initialize: function() {
        this.editView = new EditView();
        this.showView = new ShowView();
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

    var AppView = Backbone.View.extend({
      className: 'contacts',
      initialize: function() {
        this.sidebar = new SidebarView({
          model: this.model
        });
        this.main = new MainView();
        this.vdiv = $('<div />').addClass('vdivide');
        this.model.fetch();
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

    //Router
    var AppRouter = Backbone.Router.extend({
      routes: {
        '': 'show',
        'contacts/:id': 'show',
        'contacts/:id/edit': 'edit'
      },

      show: function(id) {
        appView.show(this.getContact(id));
      },
      edit: function(id) {
        appView.edit(this.getContact(id));
      },
      getContact: function(id) {
        return contacts.getByCid(id);
      }
    });

    var contacts = new Contacts();
    window.appView = new AppView({model: contacts});
    window.appRouter = new AppRouter();
    Backbone.history.start();
  });
})(jQuery);
