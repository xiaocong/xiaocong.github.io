define ['jquery', 'underscore', 'backbone', 'models/contact', 'views/contactitem'], ($, _, Backbone, Contact, ContactItemView) ->
  describe "views/contactitem", ->

    describe "test contactitem under mock model", ->
      beforeEach ->
        @contact = new Backbone.Model {name:"Jack Chen", email:"jack.chen@gmail.com"}

      afterEach ->

      describe "view event", ->
        beforeEach ->
          # ContactItemView will bind event during initialization, so we must stub it before
          # initialization
          @stub = sinon.stub ContactItemView.prototype, "select"

        afterEach ->
          @stub.restore()

        it "click event", ->
          view = new ContactItemView {model: @contact}
          view.$el.trigger("click")
          expect(@stub.called).toBe true

      describe "model event", ->
        beforeEach ->
          # The model event binding are called in initialization method, so we must spy it before
          # initialization.
          @spyRender = sinon.spy ContactItemView.prototype, "render"
          @spyRemove = sinon.spy ContactItemView.prototype, "remove"
          @view = new ContactItemView {model: @contact}

        @afterEach ->
          @spyRender.restore()
          @spyRemove.restore()

        it "change", ->
          expect(@spyRender.called).toBe false
          obj = {name:"Ming Yao", email:"ming.yao@gmail.com"}
          @contact.set(obj)
          expect(@spyRender.called).toBe true
          expect(@view.$el.html()).toContain obj.name

        it "destroy", ->
          expect(@spyRemove.called).toBe false
          @contact.destroy()
          expect(@spyRemove.called).toBe true
