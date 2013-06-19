define ['use!underscore', 'use!backbone'], (_, Backbone) ->
  global = {}
  _.extend global, Backbone.Events
  global
