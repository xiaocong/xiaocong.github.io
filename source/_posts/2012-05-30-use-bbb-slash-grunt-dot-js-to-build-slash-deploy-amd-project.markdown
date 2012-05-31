---
layout: post
title: "在AMD项目中使用grunt/bbb进行构建和发布"
date: 2012-05-30 12:25
comments: true
categories: [javascript, require.js, backbone.js, grunt.js, bbb]
---

[Jake]: https://github.com/mde/jake
[RequireJS]: http://requirejs.org/
[js-build-tools]: https://code.google.com/p/js-build-tools
[Grunt]: https://github.com/cowboy/grunt
[Grunt-bbb]: https://github.com/backbone-boilerplate/grunt-bbb

## AMD项目的构建和发布

在 Javascript 前端项目中, 为了提高页面的响应速度, 通常需要对 js/css 文件进行:

- concat, 将多个 js 或者 css 文件合成一个文件, 这样能减少浏览器给服务器发送请求的此次数, 减少在网络通讯握手上花费的时间;
- minify, 去除 js 或者 css 文件中多余的字符, 例如注释, 换行, 空格等, 并将变量的可读的长名称改为不可读的短名称, 缩短 js 和 css 文件的长度, 减少网络传输的时间;

目前已经有很多进行 Javascript 构建和发布管理的工具, 包括[Jake][], [Grunt][], [js-build-tools][] (ant tasks collection).
[RequireJS][]也已经提供了一个很好的优化 js 文件的工具[r.js](http://requirejs.org/docs/optimization.html), 可以将多个 AMD 模块合并成一个文件.
这里主要介绍 Grunt 的一个 plugin 集合: [Grunt-bbb][]

## [Grunt-bbb][]

bbb 主要包含下面这些 tasks:

- `init`
  初始化一个空的项目模板.
- `lint`
  确保所有的 js 文件符合 JSHint.
- `less`
  编译 LESS 生成 css 文件.
- `mincss`
  Minify 所有的 css 文件,并合并成一个 css 文件.
- `min`
  grunt 内置 task, Minify js 文件.
- `concat`
  合并多个文件到一个文件.
- `requirejs`
  利用`r.js`合并[RequireJS][]模块到一个 js 文件.
- `server`
  静态文件的 HTTP 服务, 用于开发调试.

### 安装

``` bash
$ npm install -g bbb
```

### 新项目初始化

进入空的项目目录,然后运行:

``` bash
$ bbb init
```

根据命令行的提示输入相应的内容, 然后会生成一个空的 `grunt.js` 文件.

### 目录结构

bbb 要求按照如下目录结构组织源代码:

```
|-app
   |-项目 js 文件
|-dist
   |-build生成的发布文件
|-assets
   |-require.js
   |-backbone.js
   |-underscore.js 等需要的 js 库文件
|-index.html
|-favicon.ico
```

css 和 img 文件缺省目录在 `assets/` 目录中. 我们可以更改 `grunt.js` 来增加/更改/删除任务('task'), 以及更改任务的设置,
包括缺省目录.

<!--more-->

## 在[AMD Backbone Contacts](https://github.com/xiaocong/xiaocong.github.com/tree/source/source/examples/amd-backbone-contacts/)中增加`bbb`构建配置

[demo](/examples/amd-backbone-contacts/index.html) 项目中没有对 js 文件进行任何优化, 下面就逐步修
改该项目来引入`bbb`进行项目构建和发布.

- 修改项目目录结构, 来适应`bbb`的要求.

主要的改动在于将`backbone`, `require`, `underscore`等库文件从`js/libs/`移动到`assets/js/`目录, 将
`js/`目录更名为`app/`, 将`templates/`和`css/`目录移动到`assets/`.

- 增加`grunt.js`配置文件.

可以用`bbb init`命令来生成缺省的`grunt.js`配置文件, *必须*包含下面的代码:
``` javascript
module.exports = function(grunt) {
  grunt.initConfig({
    //config options...
  });
};
```
- 在`grunt.js`配置选项中定义文件路径.
``` javascript
  grunt.initConfig({
    //...
    dirs: {
      debug: "dist/debug", // debug files under the folder
      release: "dist/release" // release files under the folder
    },
    //...
  });
```
- 在 `grunt.js` 配置选项中定义文件清理任务 `clean`.
``` javascript
  grunt.initConfig({
    //...
    clean: ["<config:dirs.debug>", "<config:dirs.release>"],
    //...
  });
```
- 在`grunt.js`配置选项中定义 `lint` 任务, 确保所有在 `app/` 目录下的 `js` 文件都符合 `JSHint`.
``` javascript
  grunt.initConfig({
    //...
    lint: {
      beforeconcat: [
        "app/**/*.js"
      ],
      afterconcat: [
        "dist/debug/assets/js/require/require.js"
      ]
    },
    jshint: {
      options: {
        scripturl: true
      }
    },
    //...
  });
```
*注:`lint:afterconcat`任务运行会报jQuery代码的错, 没有仔细调查原因, 因此在`concat`完成后没有调用`lint:afterconcat`任务.*

- 在`grunt.js`配置选项中定义 `requirejs` 任务, 合并所有项目所需要的 js 文件到一个 `require.js` 文件(真正的
  `assets/js/require/require.js`文件不会包含在这个输出文件中, 后面会用`concat`任务将真正的`require.js`合并进来).
``` javascript
  grunt.initConfig({
    //...
    requirejs: {
      // Include the main configuration file
      mainConfigFile: "app/config.js",
      // Output file
      out: "dist/debug/assets/js/require/require.js",
      // Root application module
      name: "config",
      // Do not wrap everything in an IIFE
      wrap: false
    }
    //...
  });
```
- 在`grunt.js`配置选项中定义`concat`任务, 将`require.js`库文件合并到`requirejs`任务的输出文件中去.
``` javascript
  grunt.initConfig({
    //...
    concat: {
      "dist/debug/assets/js/require/require.js": [
        "assets/js/require/require.js",
        "dist/debug/assets/js/require/require.js"
      ]
    },
    //...
  });
```
- 在`grunt.js`配置选项中定义`min`任务, Minify `concat`任务生成的文件到`dist/release/assets/js/require/require.js`.
``` javascript
  grunt.initConfig({
    //...
    min: {
      "dist/release/assets/js/require/require.js": [
        "dist/debug/assets/js/require/require.js"
      ]
    },
    //...
  });
```
- 在`grunt.js`配置选项中定义`mincss`任务, Minify所有的`css`文件到`dist/release/assets/css/index.css`.
``` javascript
  grunt.initConfig({
    //...
    mincss: {
      "dist/release/assets/css/index.css": [
        "assets/css/application.css"
      ]
    },
  });
```
- 在`grunt.js`配置选项中定义`copy`任务, 复制相应的文件到`dist/debug/`或者`dist/release/`目录.
``` javascript
  grunt.initConfig({
    //...
    copy: {
      debug: {
        src: ["assets/css/**/*.css", "favicon.ico"],
        renames: {"index.noconfig.html": "index.html"},
        dest: "<config:dirs.debug>"
      },
      release: {
        src: ["favicon.ico"],
        renames: {"index.noconfig.html": "index.html"},
        dest: "<config:dirs.release>"
      }
    },
    //...
  });
```
`bbb`和`grunt`没有内置文件复制任务, 因此我们需要自己实现这个任务. 这里直接采用
[jquery-ui](https://github.com/jquery/jquery-ui/blob/master/grunt.js#L392)的实现.
{% include_code copy lang:javascript bbb-amd-backbone-contacts/tasks/copy.js %}
`grunt.js`配置文件中需要加载该任务:
``` javascript
  grunt.loadTasks("tasks");  //加载所有在'tasks/'目录下的`task`.
```
- 在`grunt.js`配置选项中定义`server`任务, 用于开发调试.
``` javascript
  grunt.initConfig({
    //...
    server: {
      port: 8000,
      base: ".",
      folders: {
        "app": "app",
        "assets": "assets"
      },
      debug: {
        folders: {
          "app": "dist/debug",
          "assets": "dist/debug/assets",
          "": "dist/debug"
        }
      },
      release: {
        folders: {
          "app": "dist/release",
          "assets": "dist/release/assets",
          "": "dist/release"
        }
      }
    },
    //...
  });
```
这里定义了3个任务:

1. **`server`**: 侦听并返回`.`目录下的文件, 这个服务不对 js 和 css 文件作任何 Minify 和 concat.
2. **`server:debug`**: 侦听并返回`dist/debug/`目录下的文件.
3. **`server:release`**: 侦听并返回`dist/release/`目录下的文件.

- 将上诉任务进行串接, 定义复合任务.
``` javascript
  grunt.registerTask("default", "clean lint:beforeconcat");
  grunt.registerTask("debug", "default copy:debug requirejs concat");
  grunt.registerTask("release", "debug copy:release mincss min");
```
1. **`default`**: 清除`dist/`目录, `lint` `app/`目录下的所有 js 文件.
2. **`debug`**: 调用`default`任务, 复制相关文件到`dist/debug/`目录下, 合并 js(AMD模块) 文件, 最后合并`require.js`库文件.
3. **`release`**: 调用`debug`任务, 复制相关文件到`dist/release/`目录下, Minify css 文件, Minify js 文件.

至此, 所有的任务都已经定义完成. 下面是完整的`grunt.js`文件.
{% include_code gruntfile lang:javascript bbb-amd-backbone-contacts/grunt.js %}

## 运行

- 运行 HTTP 服务器于[开发版本]({{ root_url }}/examples/bbb-amd-backbone-contacts/index.html):
``` javascript
$ bbb server
```

- 发布文件到`dist/debug/`目录, 并运行 HTTP 服务器于 [debug 版本]({{ root_url }}/examples/bbb-amd-backbone-contacts/dist/debug/index.html):
``` javascript
$ bbb debug
$ bbb server:debug
```

- 发布文件到`dist/release/`目录, 并运行 HTTP 服务器于 [release 版本]({{ root_url }}/examples/bbb-amd-backbone-contacts/dist/release/index.html):
``` javascript
$ bbb release
$ bbb server:release
```

这里可以查看所有的**[源代码](https://github.com/xiaocong/xiaocong.github.com/tree/source/source/examples/bbb-amd-backbone-contacts/)**.

## 参考

1. [RequireJS官方网站][RequireJS]
2. [Grunt.js][grunt]
3. [bbb][Grunt-bbb]
4. [Grunt API](https://github.com/cowboy/grunt/blob/master/docs/api.md)
5. [jQuery-ui自定义grunt任务](https://github.com/jquery/jquery-ui/blob/master/grunt.js)

