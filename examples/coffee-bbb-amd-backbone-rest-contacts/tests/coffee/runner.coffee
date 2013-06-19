# we should add all specs here to make sure all specs are loaded before execution.
define ["spec/models/contact"
        "spec/collections/contacts"
        "spec/views/contactitem"], ->
  runner = ->
    jasmineEnv = jasmine.getEnv()
    jasmineEnv.updateInterval = 1000
    trivialReporter = new jasmine.TrivialReporter()
    jasmineEnv.addReporter trivialReporter
    jasmineEnv.specFilter = (spec) ->
      trivialReporter.specFilter spec
    jasmineEnv.execute()
