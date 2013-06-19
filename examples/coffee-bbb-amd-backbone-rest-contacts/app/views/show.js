
define(["jquery", "underscore", "backbone", "text!templates/show.html"], function($, _, Backbone, tplShow) {
  var ShowView;
  ShowView = Backbone.View.extend({
    className: "show",
    template: _.template(tplShow),
    events: {
      "click .edit": "edit"
    },
    initialize: function() {
      return _.bindAll(this, "edit");
    },
    render: function() {
      if (this.item) {
        this.$el.html(this.template(this.item.toJSON()));
      } else {
        this.$el.html("");
      }
      return this;
    },
    change: function(item) {
      this.item = item;
      return this.render();
    },
    edit: function() {
      if (this.item) {
        return Backbone.history.navigate("contacts/" + this.item.cid + "/edit", {
          trigger: true
        });
      }
    }
  });
  return new ShowView();
});
