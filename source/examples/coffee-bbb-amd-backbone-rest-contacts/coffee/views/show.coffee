define [ "jquery", "underscore", "backbone", "text!templates/show.html" ], ($, _, Backbone, tplShow) ->
  ShowView = Backbone.View.extend(
    className: "show"
    template: _.template(tplShow)
    events:
      "click .edit": "edit"

    initialize: ->
      _.bindAll this, "edit"

    render: ->
      if @item
        @$el.html @template(@item.toJSON())
      else
        @$el.html ""
      this

    change: (@item) ->
      @render()

    edit: ->
      if @item
        Backbone.history.navigate "contacts/" + @item.cid + "/edit",
          trigger: true
  )
  new ShowView()
