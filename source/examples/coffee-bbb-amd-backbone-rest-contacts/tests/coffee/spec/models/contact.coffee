define ['use!underscore', 'use!backbone', 'models/contact'], (_, Backbone, Contact) ->
  describe "models/contact", ->
    describe "constructor", ->
      beforeEach ->
        @contact = new Contact

      it "model properties", ->
        expect(@contact.has("name")).toBe(true)
        expect(@contact.has("email")).toBe(true)

      it "initial value of model properties", ->
        expect(@contact.get("name")).toBe("unamed")
        expect(@contact.get("email")).toBe("")

    describe "filter method", ->
      beforeEach ->
        @contact = new Contact "name":"John Taylor", "email":"john@gmail.com"

      it "non-string param", ->
        expect(@contact.filter(null)).toBe(true)
        expect(@contact.filter()).toBe(true)
        expect(@contact.filter([])).toBe(true)

      it "matched string", ->
        expect(@contact.filter("john")).toBe(true)
        expect(@contact.filter("John Taylor")).toBe(true)
        expect(@contact.filter("taylor")).toBe(true)
        expect(@contact.filter("@")).toBe(true)
        expect(@contact.filter("gmail.com")).toBe(true)

      it "unmatched string", ->
        expect(@contact.filter("johnn")).toBe(false)
        expect(@contact.filter("taylor.")).toBe(false)
        expect(@contact.filter("hotmail.com")).toBe(false)
