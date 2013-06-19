define ['jquery', 'underscore', 'backbone', 'collections/contacts', 'models/contact'], ($, _, Backbone, contacts, Contact) ->
  describe "collections/contacts", ->
    beforeEach ->
      contacts.reset [], {silent: true}

    afterEach ->
      contacts.reset [], {silent: true}

    describe "collection properties", ->
      it "properties should be defined correctly", ->
        expect(contacts.model).toBe Contact
        expect(contacts.url).toBeDefined()

    describe "fetch data via ajax", ->
      beforeEach ->
        # here we stub $.ajax so that it can be tested under mock env.
        @obj = 
          results: [{email: "jack.chen@gmail.com", id: 1, name: "Jack Chen"}, {email: "ming.yao@gmail.com", id: 2, name: "Ming Yao"}]
        @stub_ajax = sinon.stub $, "ajax"
        @stub_ajax.yieldsTo "success", @obj

      afterEach ->
        @stub_ajax.restore()

      it "data can be parsed correctly.", ->
        contacts.fetch()
        expect(contacts.length).toBe @obj.results.length
        expect(contacts.get(contact.id).toJSON()).toEqual contact for contact in @obj.results

      describe "parse data", ->
        beforeEach ->
          @stub_parse = sinon.stub contacts, "parse"

        afterEach ->
          @stub_parse.restore()

        it "make sure the parse method will be called with specified data", ->
          contacts.fetch()
          expect(@stub_parse.calledWith(@obj)).toBe true

        it "stub 'parse' method and check the fetched data", ->
          @stub_parse.returns @obj.results
          contacts.fetch()
          expect(contacts.length).toBe @obj.results.length
          expect(contacts.get(contact.id).toJSON()).toEqual contact for contact in @obj.results

    describe "fetch data from server", ->
      # make sure it can fetch data from real server.
      beforeEach ->
        @spy = sinon.spy contacts, "parse"

      afterEach ->
        @spy.restore()

      it "check contacts can fetch data from server", ->
        # as callback of $.ajax is an asynchronous method, so we have to test it using asynchronous
        # method. Here we use runs/wattsFor/runs methods of jasmine.

        # Asynchronously call the method firstly.
        runs ->
          contacts.fetch()
        # wait until parse is called or timeout
        waitsFor ->
          return @spy.called
        , "parse method not called.", 10000
        # check if returned values are correct
        runs ->
          expect(@spy.returnValues[0].length).toBeDefined()
