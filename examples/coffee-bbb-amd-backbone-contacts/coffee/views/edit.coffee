define [ "jquery", "use!underscore", "use!backbone", "text!templates/edit.html" ], ($, _, Backbone, tplEdit) ->
  EditView = Backbone.View.extend(
    className: "edit"
    template: _.template(tplEdit)
    events:
      "submit form": "submit"
      "click .save": "submit"
      "click .delete": "remove"

    initialize: ->
      _.bindAll this, "submit", "remove"

    render: ->
      @$el.html @template(@item.toJSON())  if @item
      this

    change: (@item) ->
      @render()

    submit: ->
      @item.set @form()
      @item.save()
      Backbone.history.navigate "contacts/" + @item.cid,
        trigger: true

      false

    form: ->
      name: @$("form [name=\"name\"]").val()
      email: @$("form [name=\"email\"]").val()

    remove: ->
      @item.destroy()
      @item = null
      Backbone.history.navigate "",
        trigger: true
  )
  new EditView()
