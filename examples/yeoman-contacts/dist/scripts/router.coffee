define [ "app", "modules/contact" ], (app, Contact) ->
  Router = Backbone.Router.extend(
    routes:
      "": "index"
      "contacts/:id/edit": "edit"
      "create": "create"
      "contacts/:id": "show"

    index: ->
      @reset()
      app.useLayout("main").render()

    show: (id)->
      app.active = @contacts.getByCid id
      app.action = "show"
      app.useLayout("main").render()

    edit: (id)->
      app.active = @contacts.getByCid id
      app.action = "edit"
      app.useLayout("main").render()

    create: ->
      app.active = null
      app.action = "create"
      app.useLayout("main").render()

    go: ->
      @navigate(_.toArray(arguments).join("/"), true);

    reset: ->
      app.active = null
      app.action = ""

    initialize: ->
      @contacts = new Contact.Collection()
      @sidebar = new Contact.Views.List({collection: @contacts})
      @show = new Contact.Views.Show()
      @edit = new Contact.Views.Edit()

      app.useLayout "main"
      app.layout.setViews
        ".sidebar": @sidebar
      app.layout.insertViews
        ".main": [@show, @edit]
  )
  Router
