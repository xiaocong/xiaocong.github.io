
require(["app", "router"], function(app, Router) {
  app.router = new Router();
  Backbone.history.start({
    pushState: false,
    root: app.root
  });
  app.router.contacts.fetch();
  return $(document).on("click", "a:not([data-bypass])", function(evt) {
    var href;
    href = $(this).attr("href");
    if (href && href.indexOf("#") === 0) {
      evt.preventDefault();
      return Backbone.history.navigate(href, true);
    }
  });
});
