define ['jquery', 'use!underscore', 'use!backbone', 'collections/contacts', 'views/app'], ($, _, Backbone, contacts, appView) ->
  AppRouter = Backbone.Router.extend(
    routes:
      '': 'show'
      'contacts/:id': 'show'
      'contacts/:id/edit': 'edit'

    show: (id) ->
      appView.show @getContact(id)

    edit: (id) ->
      appView.edit @getContact(id)

    getContact: (id) ->
      if typeof id isnt 'undefined' and id isnt null
        contacts.getByCid id
      else if contacts.length > 0
        contacts.at 0
  )
  new AppRouter()
