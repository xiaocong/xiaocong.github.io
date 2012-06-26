---
layout: post
title: "配合AMD/RequireJS使用Backbone.js"
date: 2012-05-16 14:23
comments: true
categories: [javascript, backbone.js, require.js]
---

[backbone]: http://backbonejs.com/ "Backbone.js"
[underscore]: http://documentcloud.github.com/underscore/ "Underscore.js"
[require]: http://requirejs.org/ "Require.js"
[source]: https://github.com/xiaocong/xiaocong.github.com/tree/source/source/examples/amd-backbone-contacts/
[demo]: /examples/amd-backbone-contacts/index.html

## 为什么使用AMD/RequireJS?

还记得C语言是怎么解决引用冲突的么?
``` c
#ifndef _MY_MODULE_H_
#define _MY_MODULE_H_

/*my code here*/

#endif  /*_MY_MODULE_H_*/
```

Backbone解决的是将用户数据，页面显示，以及流程控制模块化，而AMD解决的是将不同功能的代码封装到小的代码单元，代码单元功能的注册，以及代码依赖。

{% blockquote requirejs http://requirejs.org/docs/whyamd.html#purposes Why AMD? %}
What are JavaScript modules? What is their purpose?
- Definition: how to encapsulate a piece of code into a useful unit, and how to register its capability/export a value for the module.
- Dependency References: how to refer to other units of code.
{% endblockquote %}

## 如何使用AMD/RequireJS?

下面javascript代码定义了一个新的模块`module1`，其依赖`jquery`模块：

``` javascript module1.js
define('module1', ['jquery'] , function ($) {
    return function () {};
});
```

`define`函数接受三个参数：

- 第一个参数是个字符串，定义了本模块的名称，其他模块可以用这个名称来引用本模块曝露出来的对象；可以省略该参数，缺省以文件名来命名该模块；
- 第二个参数是个数组，定义了本模块需要引用的其他模块的列表，例如`jquery`或者其他用户自定义模块；
- 第三个参数是个函数，该函数的参数列表分别对应第二个参数里的模块列表曝露的对象；该函数的返回值即为本模块曝露的对象；

[官网][require]可以查到详细的说明和用例。

<!--more-->

## 如何配合使用[Backbone][]和[RequireJS][require]?

正式的Backbone和Underscore版本已经不再缺省支持AMD，不过我们有好几种方法可以在AMD中使用Backbone和Underscore。[Tim Branyen](http://twitter.com/tbranyen)在他的博文 [AMD/RequireJS Shim Plugin for Loading Incompatible JavaScript](http://tbranyen.com/post/amdrequirejs-shim-plugin-for-loading-incompatible-javascript) 中详细阐述了解决办法。下面的例子程序也是采用了Branyen推荐的方法。

## 使用AMD/RequireJS重写Contacts例子程序

- 没有使用AMD/RequireJS的[源代码](https://github.com/xiaocong/xiaocong.github.com/tree/source/source/examples/backbone-contacts/)和[例子](/examples/backbone-contacts/index.html)；
- 使用AMD/RequireJS改写后的[源代码][source]和[例子][demo]。

这里主要用到了AMD/RequireJS的以下模块插件：

- `use`插件，用来引用`backbone`和`underscore`等非AMD兼容的javascript库。
- `text`插件，用来异步加载模板文本文件。

下面是所有模块代码：

### Model: Contact

{% include_code Contact lang:javascript amd-backbone-contacts/js/models/contact.js %}

- *这里`Contact`模块返回的是`Contact`定义，而不是一个实例，引用该对象的其他模块必须通过`new`生成实例对象。*

### Collection: Contacts

{% include_code Contacts lang:javascript amd-backbone-contacts/js/collections/contacts.js %}

- *与`Contact`返回定义不同的是，因为该网页应用只需要一个全局`Contacts`实例对象，因此这里可以返回`new`生成的`Contacts`实例对象。*
- *通过`models/contact`来引用`Contact`定义。*

### View: ContactItem

{% include_code ContactItemView lang:javascript amd-backbone-contacts/js/views/contactitem.js %}

- *返回`ContactItemView`定义。*
- *使用了`templates/item.html`模板进行页面渲染。*

#### item template

{% include_code Contact Item View Template amd-backbone-contacts/templates/item.html %}

### View: Sidebar

{% include_code SidebarView lang:javascript amd-backbone-contacts/js/views/contactitem.js %}

- *返回`SidebarView`全局实例对象。*
- *引用了`Contacts`全局实例对象，以及`Contact`和`ContactItemView`定义。*
- *使用了`templates/sidebar.html`模板进行页面渲染。*

#### sidebar template

{% include_code Sidebar View Template amd-backbone-contacts/templates/sidebar.html %}

### View: Edit, Show 和 Main

#### `ShowView`用于显示选中`Contact`的详细内容：

{% include_code ShowView lang:javascript amd-backbone-contacts/js/views/show.js %}

- *返回`ShowView`全局实例对象。*
- *使用了`templates/show.html`模板进行页面渲染。*

##### show template

{% include_code Show View Template amd-backbone-contacts/templates/show.html %}


#### `EditView`用于编辑选中`Contact`的详细内容：

{% include_code EditView lang:javascript amd-backbone-contacts/js/views/edit.js %}

- *返回`EditView`全局实例对象。*
- *使用了`templates/edit.html`模板进行页面渲染。*

##### edit template

{% include_code Edit View Template amd-backbone-contacts/templates/edit.html %}

#### `MainView`是`ShowView`和`EditView`的容器：

{% include_code EditView lang:javascript amd-backbone-contacts/js/views/main.js %}

- *返回`MainView`全局实例对象，其功能就是根据用户的操作，显示`ShowView`或者`EditView`。*

### View: App

{% include_code AppView lang:javascript amd-backbone-contacts/js/views/app.js %}

- *返回全局`AppView`全局实例对象，包含有`SidebarView`和`MainView`。*

### namespace

全局实例对象，用于存放所有的全局定义和实例对象，同时扩展了`Backbone.Events`的功能，可以提供模块间的pub/sub服务。

{% include_code AppView lang:javascript amd-backbone-contacts/js/namespace.js %}

### store

{% include_code AppView lang:javascript amd-backbone-contacts/js/store.js %}

- *返回本地存储`Store`定义。*

### router

{% include_code AppView lang:javascript amd-backbone-contacts/js/router.js %}

- *返回全局`AppRouter`实例对象，提供客户端的页面内路由，并将页面内路由绑定到对应的事件响应函数。*

### app

{% include_code AppView lang:javascript amd-backbone-contacts/js/app.js %}

- *返回全局初始化函数，供初始化javascript脚本调用。*

### main

{% include_code AppView lang:javascript amd-backbone-contacts/js/main.js %}

- *这里用到了`require`，而不是模块定义所用的`define`。*
- *异步加载`App`实例对象，并运行`App`对象的初始化函数，开始整个应用程序的执行。*

### config

{% include_code AppView lang:javascript amd-backbone-contacts/js/config.js %}

- *AMD配置文件，定义了用到的javascript库及其对应路径，包含`Backbone`的插件库。*
- *`deps`定义了需要用`main.js`来初始化应用。*

### index.html

在`index.html`中只需要一个javascript加载语句：
{% include_code AppView lang:javascript amd-backbone-contacts/index.html %}

## 关于AMD/RequireJS的一些思考

AMD/RequireJS是按照模块之间的依赖关系进行异步加载。程序开发人员根据需求来定义依赖的模块，以及本模块的实现，而不用过多操心依赖的模块是否已经加载，加载执行顺序由AMD/RequireJS来保证。

在正常的依赖关系下，如`A`依赖于`B`，`B`依赖于`C`，那么模块执行的先后顺序是`C`->`B`->`A`。但是记住一点，这里讲的是模块初始化过程中的加载执行顺序，并不涉及到用户操作过程中的模块依赖关系。上诉例子中，可能出现`C`的用户事件响应函数需要访问`A`的数据，但是只要这个用户事件响应不是在模块初始化过程中发生的，我们就不能认为`C`依赖于`A`。模块初始化过程中的加载执行顺序肯定是不能出现循环依赖，否则就是死循环。

为了解决上诉例子中`C`的用户事件响应函数需要访问`A`的数据的问题，我们可以引人一个全局对象模块`namespace`。当模块`A`完成初始化之后，将自身对象注册到这个`namespace`中；`namespace`是一个被动对象，其在初始化过程中不依赖任何其他对象，而所有其他模块都可以依赖于`namespace`；当初始化完成后，`C`可以通过`namespace`访问到`A`。

在地址本例子中，`namespace`就是一个全局对象模块；因为模块依赖定义中，`AppRouter`依赖于`AppView`，而`AppView`的依赖模块`EditView`，`ShowView`和`SidebarView`需要能访问`AppRouter`对象；通过`namespace`全局对象模块，任何模块都可以运行时访问`AppRouter`对象。当然，我们也可以通过`namespace`，使得初始化过程中`AppRouter`和`AppView`没有依赖关系。

*在浏览器中这个`namespace`可以是`window`对象或其子对象。*
