define ['use!underscore', 'use!backbone', 'models/contact', 'store'], (_, Backbone, Contact, Store) ->
  Contacts = Backbone.Collection.extend(
    model: Contact
    localStorage: new Store('my-contacts')
  )
  new Contacts()
