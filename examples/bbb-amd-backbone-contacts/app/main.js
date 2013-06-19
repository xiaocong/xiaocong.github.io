// Filename: main.js
require([
  'app'
], function(app){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  app.initialize();
});
