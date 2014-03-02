define ['jquery', 'underscore', 'backbone', 'collections/contacts', 'router', 'views/app', 'namespace'], ($, _, Backbone, contacts, appRouter, appView, global) ->
  initialize = ->
    global.app =
      contacts : contacts
      router : appRouter
      view : appView

    contacts.fetch()
    Backbone.history.start()

  initialize: initialize
