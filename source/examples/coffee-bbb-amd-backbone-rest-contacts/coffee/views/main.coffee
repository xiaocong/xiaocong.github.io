define [ "jquery", "underscore", "backbone", "views/show", "views/edit" ], ($, _, Backbone, showView, editView) ->
  MainView = Backbone.View.extend(
    className: "main stack"
    initialize: ->
      @editView = editView
      @showView = showView

    render: ->
      @$el.append @showView.render().el
      @$el.append @editView.render().el
      this

    edit: (item) ->
      @showView.$el.removeClass "active"
      @editView.$el.addClass "active"
      @editView.change item

    show: (item) ->
      @editView.$el.removeClass "active"
      @showView.$el.addClass "active"
      @showView.change item
  )
  new MainView()
