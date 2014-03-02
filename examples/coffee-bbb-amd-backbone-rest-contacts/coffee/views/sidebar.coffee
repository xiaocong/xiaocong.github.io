define [ "jquery", "underscore", "backbone", "collections/contacts", "models/contact", "views/contactitem", "text!templates/sidebar.html" ], ($, _, Backbone, contacts, Contact, ContactItemView, tplSidebar) ->
  SidebarView = Backbone.View.extend(
    className: "sidebar"
    template: _.template(tplSidebar)
    events:
      "click footer button": "create"
      "click input": "filter"
      "keyup input": "filter"

    initialize: ->
      _.bindAll this, "create", "filter"
      @model.bind "reset", @renderAll, this
      @model.bind "add", @add, this
      @model.bind "remove", @remove, this

    render: ->
      $(@el).html @template()
      @renderAll()
      this

    renderAll: ->
      @$(".items").empty()
      @model.each @renderOne, this
      @filter()

    renderOne: (contact) ->
      view = new ContactItemView(model: contact)
      @$(".items").append view.render().el

    create: ->
      contact = new Contact()
      @model.add contact
      Backbone.history.navigate "contacts/" + contact.cid + "/edit",
        trigger: true

    filter: ->
      query = $("input", @el).val()
      @model.each (contact) ->
        contact.view.$el.toggle contact.filter(query)

    active: (item) ->
      @activeItem.view.deactive()  if @activeItem
      @activeItem = item
      @activeItem.view.active()  if @activeItem

    add: (contact) ->
      @renderOne contact

    remove: (contact) ->
      console.log contact
  )
  new SidebarView(model: contacts)
