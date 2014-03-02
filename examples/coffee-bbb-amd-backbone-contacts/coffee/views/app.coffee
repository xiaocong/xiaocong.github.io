define [ "jquery", "use!underscore", "use!backbone", "views/sidebar", "views/main" ], ($, _, Backbone, sidebarView, mainView) ->
  AppView = Backbone.View.extend(
    className: "contacts"
    initialize: ->
      @sidebar = sidebarView
      @main = mainView
      @vdiv = $("<div />").addClass("vdivide")
      @render()

    render: ->
      @$el.append @sidebar.render().el
      @$el.append @vdiv
      @$el.append @main.render().el
      $("#article").append @el
      this

    show: (item) ->
      @sidebar.active item
      @main.show item

    edit: (item) ->
      @sidebar.active item
      @main.edit item
  )
  new AppView()
