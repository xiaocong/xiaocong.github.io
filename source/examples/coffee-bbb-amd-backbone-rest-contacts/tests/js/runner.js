
define(["spec/models/contact", "spec/collections/contacts", "spec/views/contactitem"], function() {
  var runner;
  return runner = function() {
    var jasmineEnv, trivialReporter;
    jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    trivialReporter = new jasmine.TrivialReporter();
    jasmineEnv.addReporter(trivialReporter);
    jasmineEnv.specFilter = function(spec) {
      return trivialReporter.specFilter(spec);
    };
    return jasmineEnv.execute();
  };
});
