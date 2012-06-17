define ['use!underscore', 'use!backbone'], (_, Backbone) ->
  Contact = Backbone.Model.extend(
    defaults:
      name: 'unamed'
      email: ''

    filter: (query) ->
      if typeof query isnt "string"
        true
      else
        query = query.toLowerCase()
        @get("name").toLowerCase().indexOf(query) isnt -1 or @get("email").toLowerCase().indexOf(query) isnt -1
  )
  Contact
