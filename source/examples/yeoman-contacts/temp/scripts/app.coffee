define [ "jquery", "lodash", "backbone", "plugins/backbone.layoutmanager" ], ($, _, Backbone) ->
  app = root: "./"
  JST = window.JST = window.JST or {}
  Backbone.LayoutManager.configure
    manage: true
    paths:
      layout: "templates/layouts/"
      template: "templates/"

    fetch: (path) ->
      path = path + ".html"
      unless JST[path]
        $.ajax(
          url: app.root + path
          async: false
        ).then (contents) ->
          JST[path] = _.template(contents)
      JST[path]

  _.extend app,
    module: (additionalProps) ->
      _.extend
        Views: {}
      , additionalProps

    useLayout: (name) ->
      return @layout  if @layout and @layout.options.template is name
      @layout.remove()  if @layout
      layout = new Backbone.Layout(
        template: name
        className: "contacts"
        id: "layout"
      )
      $("#article").empty().append layout.el
      layout.render()
      @layout = layout
      layout
  , Backbone.Events
