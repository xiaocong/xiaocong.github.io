define(['use!underscore', 'use!backbone', 'models/contact'], function(_, Backbone, Contact) {
  return describe("models/contact", function() {
    describe("constructor", function() {
      beforeEach(function() {
        return this.contact = new Contact;
      });
      it("model properties", function() {
        expect(this.contact.has("name")).toBe(true);
        return expect(this.contact.has("email")).toBe(true);
      });
      return it("initial value of model properties", function() {
        expect(this.contact.get("name")).toBe("unamed");
        return expect(this.contact.get("email")).toBe("");
      });
    });
    return describe("filter method", function() {
      beforeEach(function() {
        return this.contact = new Contact({
          "name": "John Taylor",
          "email": "john@gmail.com"
        });
      });
      it("non-string param", function() {
        expect(this.contact.filter(null)).toBe(true);
        expect(this.contact.filter()).toBe(true);
        return expect(this.contact.filter([])).toBe(true);
      });
      it("matched string", function() {
        expect(this.contact.filter("john")).toBe(true);
        expect(this.contact.filter("John Taylor")).toBe(true);
        expect(this.contact.filter("taylor")).toBe(true);
        expect(this.contact.filter("@")).toBe(true);
        return expect(this.contact.filter("gmail.com")).toBe(true);
      });
      return it("unmatched string", function() {
        expect(this.contact.filter("johnn")).toBe(false);
        expect(this.contact.filter("taylor.")).toBe(false);
        return expect(this.contact.filter("hotmail.com")).toBe(false);
      });
    });
  });
});