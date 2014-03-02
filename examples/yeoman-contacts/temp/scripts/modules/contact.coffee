define [ "jquery", "lodash", "backbone", "app" ], ($, _, Backbone, app) ->
  
  Contact = app.module()

  #Contact Model contains two fields: name and email
  Contact.Model = Backbone.Model.extend(
    defaults:
      name: 'unamed'
      email: 'unamed@example.com'

    # filter out contact containing the query string in either 'name' or 'email'
    filter: (query) ->
      if typeof query isnt "string"
        true
      else
        query = query.toLowerCase()
        @get("name").toLowerCase().indexOf(query) isnt -1 or @get("email").toLowerCase().indexOf(query) isnt -1
  )

  # Contact Colletion contains a list of contacts.
  Contact.Collection = Backbone.Collection.extend(
    model: Contact.Model
    url: "http://xiaocong.herokuapp.com/contacts/"
    parse: (resp) ->
      # The data returned on the url is like {'results': [{'name':'...', 'email':'...'}, ...]}.
      # We must parse the data to Array so that Backbone.Collection can handle it.
      resp.results
  )

  # Item view of sidebar list, to show contact name.
  Contact.Views.Item = Backbone.LayoutView.extend(
    tagName: "div" # default tagName is 'div' in case of not defined
    className: "item"
    template: "contact/item"
    events:
      click: "select"

    serialize: -> @model.toJSON()

    initialize: ->
      @model.on "reset", @render, this
      @model.on "change", @render, this
      @model.on "destroy", @remove, this

    cleanup: ->
      @model.off null, null, @

    beforeRender: ->
      if @model is app.active
        @$el.siblings().removeClass "active"
        @$el.addClass "active"

    select: ->
      app.router.go "contacts", @model.cid
  )

  # sidebar List view
  Contact.Views.List = Backbone.LayoutView.extend(
    template: "contact/sidebar"
    className: "sidebar"
    keep: true
    events:
      "click footer button": "create"
      "click input": "filter"
      "keyup input": "filter"

    initialize: ->
      @query = ""
      @collection.on "reset", @render, this
      @collection.on "add", @render, this
      @collection.on "remove", @render, this

    cleanup: ->
      @collection.off null, null, this

    serialize: -> collection: @collection

    beforeRender: ->
      @collection.each (contact) ->
        item = new Contact.Views.Item(model: contact)
        @insertView '.items', item
      , this

    create: ->
      app.router.go "create"
      false

    filter: ->
      query = $("input", @el).val()
      @getViews().each (view)->
        view.$el.toggle view.model.filter(query)
      false
  )


  # show view to display contact details
  Contact.Views.Show = Backbone.LayoutView.extend(
    template: "contact/show"
    className: "show"
    keep: true
    events:
      "click .edit": "edit"

    serialize: ->
      app.active?.toJSON() ? {name:"", email:""}

    beforeRender: ->
      if app.action is "show"
        @$el.siblings().removeClass "active"
        @$el.addClass "active"
      else
        @$el.removeClass "active"

    edit: ->
      if app.active
        app.router.go "contacts", app.active.cid, "edit"
  )

  # edit view to modify an existing contact or create a new one.
  Contact.Views.Edit = Backbone.LayoutView.extend(
    template: "contact/edit"
    className: "edit"
    keep: true
    events:
      "submit form": "submit"
      "click .save": "submit"
      "click .delete": "remove"

    serialize: ->
      app.active?.toJSON() ? {name:"unamed", email:"unamed@example.com"}

    beforeRender: ->
      if app.action is "edit" or app.action is "create"
        @$el.siblings().removeClass "active"
        @$el.addClass "active"
      else
        @$el.removeClass "active"

    # save
    submit: ->
      if app.action is "edit"
        active = app.active
        app.active.set @form()
        app.active.save()
      else if app.action is "create"
        active = new Contact.Model()
        active.set @form()
        app.router.contacts.add active
        active.save()
      app.router.go "contacts", active.cid
      false

    form: ->
      name: @$("form [name=\"name\"]").val(), email: @$("form [name=\"email\"]").val()

    # delete a contact
    remove: ->
      app.active?.destroy()
      app.active = null
      app.action = ""
      app.router.go ""
      false
  )

  Contact