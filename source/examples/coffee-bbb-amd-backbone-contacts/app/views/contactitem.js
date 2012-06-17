
define(["jquery", "use!underscore", "use!backbone", "text!templates/item.html"], function($, _, Backbone, tplItem) {
  var ContactItemView;
  ContactItemView = Backbone.View.extend({
    className: "item",
    template: _.template(tplItem),
    events: {
      click: "select"
    },
    initialize: function() {
      _.bindAll(this, "select");
      this.model.bind("reset", this.render, this);
      this.model.bind("change", this.render, this);
      this.model.bind("destroy", this.remove, this);
      if (this.model.view) this.model.view.remove();
      return this.model.view = this;
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    select: function() {
      return Backbone.history.navigate("contacts/" + this.model.cid, {
        trigger: true
      });
    },
    active: function() {
      return this.$el.addClass("active");
    },
    deactive: function() {
      return this.$el.removeClass("active");
    }
  });
  return ContactItemView;
});
