define([
  'use!underscore',
  'use!backbone',
], function(_, Backbone){
  //Context to store global variable.
  // It also provides the pubsub service for other modules.
  var global = {};
  _.extend(global, Backbone.Events);

  return global;
});
