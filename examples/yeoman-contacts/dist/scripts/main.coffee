require [ "app", "router" ], (app, Router) ->
  app.router = new Router()
  Backbone.history.start
    pushState: false
    root: app.root

  app.router.contacts.fetch()

  $(document).on "click", "a:not([data-bypass])", (evt) ->
    href = $(this).attr("href")
    if href and href.indexOf("#") is 0
      evt.preventDefault()
      Backbone.history.navigate href, true
