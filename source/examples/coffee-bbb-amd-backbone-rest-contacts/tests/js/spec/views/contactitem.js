
define(['jquery', 'use!underscore', 'use!backbone', 'models/contact', 'views/contactitem'], function($, _, Backbone, Contact, ContactItemView) {
  return describe("views/contactitem", function() {
    return describe("test contactitem under mock model", function() {
      beforeEach(function() {
        return this.contact = new Backbone.Model({
          name: "Jack Chen",
          email: "jack.chen@gmail.com"
        });
      });
      afterEach(function() {});
      describe("view event", function() {
        beforeEach(function() {
          return this.stub = sinon.stub(ContactItemView.prototype, "select");
        });
        afterEach(function() {
          return this.stub.restore();
        });
        return it("click event", function() {
          var view;
          view = new ContactItemView({
            model: this.contact
          });
          view.$el.trigger("click");
          return expect(this.stub.called).toBe(true);
        });
      });
      return describe("model event", function() {
        beforeEach(function() {
          this.spyRender = sinon.spy(ContactItemView.prototype, "render");
          this.spyRemove = sinon.spy(ContactItemView.prototype, "remove");
          return this.view = new ContactItemView({
            model: this.contact
          });
        });
        this.afterEach(function() {
          this.spyRender.restore();
          return this.spyRemove.restore();
        });
        it("change", function() {
          var obj;
          expect(this.spyRender.called).toBe(false);
          obj = {
            name: "Ming Yao",
            email: "ming.yao@gmail.com"
          };
          this.contact.set(obj);
          expect(this.spyRender.called).toBe(true);
          return expect(this.view.$el.html()).toContain(obj.name);
        });
        return it("destroy", function() {
          expect(this.spyRemove.called).toBe(false);
          this.contact.destroy();
          return expect(this.spyRemove.called).toBe(true);
        });
      });
    });
  });
});
