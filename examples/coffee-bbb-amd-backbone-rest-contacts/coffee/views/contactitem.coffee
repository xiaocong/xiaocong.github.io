define [ "jquery", "underscore", "backbone", "text!templates/item.html" ], ($, _, Backbone, tplItem) ->
  ContactItemView = Backbone.View.extend(
    className: "item"
    template: _.template(tplItem)
    events:
      click: "select"

    initialize: ->
      _.bindAll this, "select"
      @model.bind "reset", @render, this
      @model.bind "change", @render, this
      @model.bind "destroy", @remove, this
      @model.view.remove()  if @model.view
      @model.view = this

    render: ->
      @$el.html @template(@model.toJSON())
      this

    select: ->
      Backbone.history.navigate "contacts/" + @model.cid,
        trigger: true

    active: ->
      @$el.addClass "active"

    deactive: ->
      @$el.removeClass "active"
  )
  ContactItemView
