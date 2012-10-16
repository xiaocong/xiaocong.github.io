---
layout: post
title: "Yeoman: 一个新的 javascript 构建工具"
date: 2012-10-16 12:59
comments: true
categories: [javascript, yeoman, grunt.js, bbb]
---

[grunt]: http://gruntjs.com/ "Grunt is a task-based command line build tool for JavaScript projects."
[bbb]: https://github.com/backbone-boilerplate/grunt-bbb "Backbone Boilerplate framework tool."
[yeoman]: http://yeoman.io/ "Yeoman is a robust and opinionated set of tools, libraries, and a workflow that can help developers quickly build beautiful, compelling web apps."
[backbone]: http://backbonejs.org/ "Front-End Javascript MVC framework"
[requirejs]: http://requirejs.org/ "RequireJS is a JavaScript file and module loader."

[Grunt][] 是一个非常优秀的 Javascript 构建工具, 虽然它的 Build-in 的任务非常有限, 但是它提供了一套非常灵活的插件机制, 可以进行任务扩展. 目前在官网上的第三方任务插件数目已经达到 160+, 并且在持续增长中... 对于通用的功能基本上都能找到对应的任务插件, 当然你也可以自己写扩展任务来满足特殊的构建需求.

我通常会直接使用 [bbb][], 因为 [bbb][] 已经收集齐了我想用到的任务插件, 非常顺手.

对我而言 [bbb][] 已经足够用了, 尽管这样, 在第一次尝试 [Yeoman][] 之后, 我还是忍不住想向大家推荐这个新的工具.

{% blockquote Yeoman Community http://yeoman.io/whyyeoman.html WHY YEOMAN? %}
Yeoman is a robust and opinionated client-side stack, comprised of tools and frameworks that can help developers quickly build beautiful web applications. We take care of providing everything needed to get started without any of the normal headaches associated with a manual setup.
With a modular architecture that can scale out of the box, we leverage the success and lessons learned from several open-source communities to ensure the stack developers use is as intelligent as possible.
As firm believers in good documentation and well thought out build processes, Yeoman includes support for linting, testing, minification and much more, so developers can focus on solutions rather than worrying about the little things.
Yeoman is fast, performant and is optimized to work best in modern browsers.
{% endblockquote %}

想对比其他 Javascript 构建工具, Yeoman 具有下面非常吸引人的特点:

## 根据定制模板快速生成程序框架

[Yeoman][] 能根据你选择的框架初始化生成程序框架, 目前已经支持大量的程序模板, 看趋势似乎是想把所有框架的初始化模板都包含进去:

    Yeoman:
      generator
      controller
    
    Angular:
      angular:service
      angular:all
      angular:directive
      angular:view
      angular:route
      angular:filter
      angular:controller
      angular:app
    
    Testacular:
      testacular:app
    
    Quickstart:
      quickstart:all
    
    Bbb:
      bbb:all
    
    Ember:
      ember:controller
      ember:all
      ember:view
      ember:model
      ember:app
    
    Chromeapp:
      chromeapp:all
    
    Ember-starter:
      ember-starter:all
    
    Backbone:
      backbone:model
      backbone:view
      backbone:router
      backbone:collection
      backbone:app
      backbone:all

虽然目前我只用到了 Bbb 模板, 但还是得赞一下其模板的齐全.

## 前端 Javascript 包管理

在目前, 我们都是手工增加和管理前端应用中用到的 Javascript 库, 例如说 jQuery, 每次当 jQuery 发布一个新版本, 我们都不得不手工地从官网上下载最新的发布文件, 然后将这个文件复制到自己的项目中.

Yemoman 可以让我们省掉这种麻烦的手工操作. 它集成了前端 Javascript 包管理应用 [Bower](https://github.com/twitter/bower), 我们只需要简单地运行 `yeoman install jquery`, 或者 `yeoman update jquery` 就能安装或者更新 jQuery 库文件.

## 监测文件更新并自动重新加载应用

每次当源文件有了修改, 无论是 HTML, CSS, Markdown 文件, 还是脚本文件, 或者其他需要预处理的 CoffeeScript, Sass 等文件, Yeoman 带来的活动加载监测进程会自动重新加载你的页面.
在调试的过程中, 这个功能的确能帮你省不少手工刷新的麻烦:-).

使用 `yeoman server` 就能运行一个本地 Web 服务器, 监测文件的变化并实时重新加载应用.

## 强大的构建系统

Yeoman 也是基于 [grunt][], 并且额外开发了一些高度定制的构建任务. 对我来说比较新鲜的构建任务是图片的优化, 使用 OptiPNG 和 JPEGTran 优化图片来减少图片的下载时间, 初步测试的结果是能减少大约 30% 图片大小, 这在以前的项目中还没尝试过.

---

最后, 下面是使用 Yeoman 重构后的地址本应用的[演示](/examples/yeoman-contacts/dist/)和[源码](https://github.com/xiaocong/xiaocong.github.com/tree/source/source/examples/yeoman-contacts).
