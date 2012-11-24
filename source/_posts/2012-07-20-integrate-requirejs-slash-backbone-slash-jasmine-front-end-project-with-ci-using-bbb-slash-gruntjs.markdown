---
layout: post
title: "Requirejs/Backbone/Jasmine前端项目和持续继承"
date: 2012-07-20 11:03
comments: true
categories: [javascript, backbone.js, require.js, jasmine.js, phantom.js, coffeescript, bbb, grunt.js]
---

[bbb]: https://github.com/backbone-boilerplate/grunt-bbb "Backbone Boilerplate framework tool."
[gruntjs]: https://github.com/cowboy/grunt "task-based command line build tool for JavaScript projects"
[jasmine]: http://pivotal.github.com/jasmine/
[sinon]: http://sinonjs.org/ "sinon.js"
[Phantomjs]: http://phantomjs.org/
[requirejs]: http://requirejs.org/

[Contact](http://xiaocong.github.com/examples/coffee-bbb-amd-backbone-rest-contacts/dist/release/)([源代码](https://github.com/xiaocong/xiaocong.github.com/tree/master/examples/coffee-bbb-amd-backbone-rest-contacts))示例项目使用了[bbb][]作为项目构建工具,
作为[gruntjs][]的扩展, [bbb][]能很方便地完成:

- Coffeescript的编译
- 文件的清除和复制
- 源代码lint
- 编译LESS
- 优化requirejs模块
- js/css文件的合并和优化
- 文件的压缩, 打包
- 内置调试http服务器

并且项目中还使用[bbb][]进行[jasmine][]单元测试代码的编译. 所有的操作都可以通过定义[bbb][]任务并以命令行方式进行运行, 唯一的一个例外是[jasmine][]测试执行需要启动浏览器执行.
如果要在项目中实施持续集成, 就必须不能依赖浏览器而以命令行方式执行测试.

曾经尝试过[envjs](http://www.envjs.com/), 但在当前的实现中, [envjs](http://www.envjs.com/)还不能顺利运行[requirejs][]的异步模块加载([issue](https://github.com/envjs/env-js/issues/7)).
[Phantomjs][]是另外一种方案, 它可以很顺利地集成[jasmine][]以及[requirejs][], 但是如果需要集成得很好, 必须得实现一个[jasmine][]的`reporter`用来和[Phantomjs][]进行通讯,
并且还得实现一个[gruntjs][]任务插件, 用来调用[Phantomjs][]执行测试, 以及生成测试报告. 这个工作量不大, 我也曾经完成了一个最简单的[gruntjs][]任务来调用[Phantomjs][]. 正在想着怎样进行重构的时候,
突然发现最新的[bbb][]已经悄然导入了[grunt-jasmine-task](https://github.com/creynders/grunt-jasmine-task), 一个利用[Phantomjs][]执行[jasmine][]测试的[gruntjs][]任务插件.

Ok, 那一切就简单了. 现在仅仅需要修改`grunt.js`配置文件来定义项目的`jasmine`任务. 当然, 之前必须安装[Phantomjs][]([gruntjs][]网站上有关于如何安装的[faq](https://github.com/cowboy/grunt/blob/master/docs/faq.md#why-does-grunt-complain-that-phantomjs-isnt-installed)).
``` javascript
  grunt.initConfig({
    // jasmine task is to run specs using phantom, before running it, you must
    // make sure you have installed phantom following instruction on
    // https://github.com/cowboy/grunt/blob/master/docs/faq.md#why-does-grunt-complain-that-phantomjs-isnt-installed
    jasmine: {
      all: {
        src:['http://localhost:8000/tests/SpecRunner.html'],
        timeout: 300000 //in milliseconds
      }
    }
  });

```
启动`http`服务:
``` bash
$ ./node_modules/bbb/bin/bbb server
Running "server" task
Listening on http://127.0.0.1:8000

```
然后在另一个终端运行`jasmine`任务:
``` bash
$ ./node_modules/bbb/bin/bbb jasmine
Running "jasmine:all" (jasmine) task
Running specs for SpecRunner.html
.............
>> 31 assertions passed in 13 specs (1451ms)

Done, without errors.

```

<!--more-->

在CI系统中, 一种可行的做法是使用`shell`脚本或者`Makefile`, 先启动`http`服务, 然后异步执行测试. 这是一个可行的方案, 但是`grunt.js`本身就是一个命令行工具, 为什么还要用`shell`或者`make`了?

`grunt.js`支持`alias task`, 我们可以这样定义一个任务别名:
``` javascript
grunt.registerTask('test', 'default server jasmine');
```
执行`test`任务等价于按照顺序执行`default`, `server`, `jasmine`任务. 我们希望这样能工作, 可惜的是, `bbb`的`server`任务是阻塞式的, 不会退出,
也就是说, 在它后面的`jasmine`任务永远不会被执行.

我们希望执行一个`server`任务, 它能异步启动一个非阻塞的`http`服务, 后面的任务可以使用这个服务, 并且当`grunt`进程退出的时候, 该`http`服务能自动退出.
下面代码是用`node`的`connect`实现的满足这个要求的`staticserver`任务:
``` javascript staticserver.js
/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

module.exports = function(grunt) {

  // Nodejs libs.
  var path = require('path');

  // External libs.
  var connect = require('connect');

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('staticserver', 'Start a static web server.', function() {
    // Get values from config, or use defaults.
    var port = grunt.config('server.port') || 8000;
    var base = path.resolve(grunt.config('server.base') || '.');

    var middleware = [
      // Serve static files.
      connect.static(base),
      // Make empty directories browsable. (overkill?)
      connect.directory(base)
    ];

    // If --debug was specified, enable logging.
    if (grunt.option('debug')) {
      connect.logger.format('grunt', ('[D] server :method :url :status ' +
        ':res[content-length] - :response-time ms').magenta);
      middleware.unshift(connect.logger('grunt'));
    }

    // Start server.
    grunt.log.writeln('Starting static web server on port ' + port + '.');
    connect.apply(null, middleware).listen(port);
  });

};

```
假如你看过[gruntjs][]的代码, 你应当能看出来, 这其实就是[gruntjs][]自带的`server`任务, 只是为了避免和`bbb`的`server`任务命名冲突, 这里将任务注册的名称从`server`换成了`staticserver`.

将`staticserver.js`文件和其他`gruntjs` `task`文件一样存放在`<工程目录>/tasks`目录下, 确保这个任务能正确加载. 然后, 如下注册一个`alias task`命名为`test`:
``` javascript
  // Register test task, which will compile app and run the server and then do test.
  // Here we use 'staticserver' task (pure grunt static server) for testing.
  grunt.registerTask('test', 'default staticserver jasmine');

```
运行这个`test`任务就能到下面的输出:
```
$ ./node_modules/bbb/bin/bbb test
Running "clean:0" (clean) task
Removing: app
Removing: dist/debug
Removing: dist/release
Removing: tests/js

Running "clean:1" (clean) task
Removing: app
Removing: dist/debug
Removing: dist/release
Removing: tests/js

Running "clean:2" (clean) task
Removing: app
Removing: dist/debug
Removing: dist/release
Removing: tests/js

Running "clean:3" (clean) task
Removing: app
Removing: dist/debug
Removing: dist/release
Removing: tests/js

Running "coffee:app" (coffee) task

Running "lint:beforeconcat" (lint) task
Lint free.

Running "coffee:spec" (coffee) task

Running "staticserver" task
Starting static web server on port 8000.

Running "jasmine:all" (jasmine) task
Running specs for SpecRunner.html
.............
>> 31 assertions passed in 13 specs (2256ms)

Done, without errors.

```

## 参考

- [示例程序源代码](https://github.com/xiaocong/xiaocong.github.com/tree/master/examples/coffee-bbb-amd-backbone-rest-contacts)
- [bbb][]
- [gruntjs][]
- [Phantomjs][]

