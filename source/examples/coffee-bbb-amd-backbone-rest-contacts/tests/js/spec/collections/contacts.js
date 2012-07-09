
define(['jquery', 'use!underscore', 'use!backbone', 'collections/contacts', 'models/contact'], function($, _, Backbone, contacts, Contact) {
  return describe("collections/contacts", function() {
    beforeEach(function() {
      return contacts.reset([], {
        silent: true
      });
    });
    afterEach(function() {
      return contacts.reset([], {
        silent: true
      });
    });
    describe("collection properties", function() {
      return it("properties should be defined correctly", function() {
        expect(contacts.model).toBe(Contact);
        return expect(contacts.url).toBeDefined();
      });
    });
    describe("fetch data via ajax", function() {
      beforeEach(function() {
        this.obj = {
          results: [
            {
              email: "jack.chen@gmail.com",
              id: 1,
              name: "Jack Chen"
            }, {
              email: "ming.yao@gmail.com",
              id: 2,
              name: "Ming Yao"
            }
          ]
        };
        this.stub_ajax = sinon.stub($, "ajax");
        return this.stub_ajax.yieldsTo("success", this.obj);
      });
      afterEach(function() {
        return this.stub_ajax.restore();
      });
      it("data can be parsed correctly.", function() {
        var contact, _i, _len, _ref, _results;
        contacts.fetch();
        expect(contacts.length).toBe(this.obj.results.length);
        _ref = this.obj.results;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          contact = _ref[_i];
          _results.push(expect(contacts.get(contact.id).toJSON()).toEqual(contact));
        }
        return _results;
      });
      return describe("parse data", function() {
        beforeEach(function() {
          return this.stub_parse = sinon.stub(contacts, "parse");
        });
        afterEach(function() {
          return this.stub_parse.restore();
        });
        it("make sure the parse method will be called with specified data", function() {
          contacts.fetch();
          return expect(this.stub_parse.calledWith(this.obj)).toBe(true);
        });
        return it("stub 'parse' method and check the fetched data", function() {
          var contact, _i, _len, _ref, _results;
          this.stub_parse.returns(this.obj.results);
          contacts.fetch();
          expect(contacts.length).toBe(this.obj.results.length);
          _ref = this.obj.results;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            contact = _ref[_i];
            _results.push(expect(contacts.get(contact.id).toJSON()).toEqual(contact));
          }
          return _results;
        });
      });
    });
    return describe("fetch data from server", function() {
      beforeEach(function() {
        return this.spy = sinon.spy(contacts, "parse");
      });
      afterEach(function() {
        return this.spy.restore();
      });
      return it("check contacts can fetch data from server", function() {
        runs(function() {
          return contacts.fetch();
        });
        waitsFor(function() {
          return this.spy.called;
        }, "parse method not called.", 10000);
        return runs(function() {
          return expect(this.spy.returnValues[0].length).toBeDefined();
        });
      });
    });
  });
});
