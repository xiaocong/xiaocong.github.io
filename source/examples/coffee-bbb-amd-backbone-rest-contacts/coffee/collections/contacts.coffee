define ['use!underscore', 'use!backbone', 'models/contact'], (_, Backbone, Contact) ->
  Contacts = Backbone.Collection.extend(
    model: Contact
    url: 'http://xiaocong.herokuapp.com/contacts/'
    parse: (resp) ->
      resp.results
  )
  new Contacts()
