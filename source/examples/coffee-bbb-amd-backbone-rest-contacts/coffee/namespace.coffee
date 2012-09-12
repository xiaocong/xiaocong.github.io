define ['underscore', 'backbone'], (_, Backbone) ->
  global = {}
  _.extend global, Backbone.Events
  global
