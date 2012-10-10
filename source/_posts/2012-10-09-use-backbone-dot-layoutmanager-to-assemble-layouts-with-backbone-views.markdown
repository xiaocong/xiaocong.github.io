---
layout: post
title: "在Backbone项目中使用backbone.layoutmanager来组织页面布局"
date: 2012-10-09 19:20
comments: true
categories: [backbone.js backbone.layoutmanager bbb]
---

[backbone.layoutmanager]: https://github.com/tbranyen/backbone.layoutmanager
[backbone]: http://backbonejs.org/ "Front-End Javascript MVC framework"
[bbb]: https://github.com/backbone-boilerplate/grunt-bbb "Backbone Boilerplate framework tool."
[underscore]: http://underscorejs.org/

[bbb][] 的 `init` 命令生成的初始化模板工程中包含有 [backbone.layoutmanager][] 插件, 该插件提供了一种页面的结构化组织方式, 将 `Backbone Views` 组装成页面布局 `Layout`.

[backbone.layoutmanager][] 主要的目的是提供一种规则来管理 `Backbone.View` 的渲染, 程序员只需要遵循这套规则, 就能简化页面渲染的实现.
[backbone.layoutmanager][] 主页已经很详细地介绍了使用方法, 这里就不再赘述. 下面是个人感觉在学习使用过程中感觉应当注意的几点:

- 完全受管理的 render

`Backbone.LayoutView` 仅仅是一个将 `manage` 属性设置成 `true` 的 `Backbone.View`.
``` javascript backbone.layoutmanager V0.6.6
Backbone.LayoutView = Backbone.View.extend({
  manage: true
});
```
只有当 `manage` 属性被设置为 `true`, `LayoutManager` 才会接管 `Backbone.View` 的渲染.

- 数据和模板

视图的渲染需要 `template` 和 `serialize` 属性, 分别对应HTML模板和数据模型. `LayoutManager` 缺省使用 [underscore][] 的 `template` 函数进行页面的渲染.

- 嵌套视图

可以通过 `setView`, `setViews`, `insertView`, `insertViews` 等函数在**视图**中嵌套多个其他的**子视图**.

- BeforeRender 和 AfterRender

`render` 完全处在 `LayoutManager` 的管理下, 因此, 如果你想在每次视图渲染前后做一些特殊的处理, 必须定义 `beforeRender` 和 `afterRender` 函数.
由于 `LayoutManager` 内部会在渲染**视图**前移除所有附加模式的**子视图**, 因此, 通常在 `beforeRender` 函数中调用 `setView` 和 `insertView` 来增加和设置**子视图**.

*如果你不想在每次渲染时移除子视图, 自己控制子视图的增删, 可以设置子视图的 `keep` 属性为 `true`.*

- Cleanup 函数

很多视图(View)都有数据模型(model)的事件绑定函数, 因此, 必须在视图被删除后解除绑定. 可以通过定义视图的 `cleanup` 函数来完成这个解绑操作:

``` javascript cleanup函数
var MyView = Backbone.View.extend({
  // The constructor binds the model's "change" event to the view's render function. 
  initialize: function() {
    this.model.on("change", this.render, this);
  }，

  // This is a custom cleanup method that will remove the model events owned by
  // this View.
  cleanup: function() {
    this.model.off(null, null, this);
  }
});
```

- 自定义获取模版

`LayoutManager` 缺省只支持 `script` 标签的模版, 但是在实际软件项目中, 通常会将不同的模版放置在不同的单独的 html 文件中, 这样便于模版文件的管理.
`LayoutManager` 提供了 `fetch` 配置项让我们有机会来自己获得模版文件:

``` coffeescript 从script标签中获得模版内容
  Backbone.LayoutManager.configure
    # Default fetch implementation, get template from `script` tag
    fetch: (path)->
      _.template $(path).html()
```

``` coffeescript 同步方式获取模版文件
  JST = window.JST = window.JST or {}
  Backbone.LayoutManager.configure
    manage: true
    paths:
      layout: "templates/layouts/"
      template: "templates/"

    fetch: (path) ->
      path = path + ".html"
      unless JST[path]
        $.ajax(
          url: app.root + path
          async: false
        ).then (contents) ->
          JST[path] = _.template(contents)
      JST[path]
```

下面是作者的教学视频, 初学者一定要看看.

{% video http://player.vimeo.com/video/32765088 800 313 %}

