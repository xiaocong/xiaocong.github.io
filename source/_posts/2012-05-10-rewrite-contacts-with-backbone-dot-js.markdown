---
layout: post
title: "使用backbone.js重写spine的contact例子"
date: 2012-05-10 12:22
comments: true
categories: [javascript, backbone.js]
---

[backbone]: http://backbonejs.com/ "Backbone.js"
[underscore]: http://documentcloud.github.com/underscore/ "Underscore.js"
[spine]: http://spinejs.com/ "Spine.js"
[spine-contacts]: http://spine-contacts.herokuapp.com/ "Demo"
[spine-contacts-github]: https://github.com/maccman/spine.contacts "GitHub"
[spa]: http://en.wikipedia.org/wiki/Single-page_application "Single-page application"
[source]: https://github.com/xiaocong/xiaocong.github.com/tree/source/source/examples/backbone-contacts/
[demo]: /examples/backbone-contacts/index.html
[Zepto]: http://zeptojs.com/
[jQuery]: http://jquery.org/

相对于传统的服务器端动态页面技术，[SPA][](单页面应用)在浏览器端实现了所有的页面逻辑，避免了页面跳转而造成的操作中断，提供更为平滑的用户体验。要实现[SPA][]，浏览器端必然需要一个javascript库来管理数据模块，用户操作，以及界面刷新，类似于服务器端MVC结构。在[这里][spa]可以找到目前流行的浏览器端类MVC实现。

前些日子先后学习了[Backbone][]和[Spine][]，并参阅了双方的不少例子程序，其中包括[Spine][]实现的Spine.Contacts([demo][spine-contacts], [source][spine-contacts-github])。为了更好地理解[Backbone][]的原理，就利用空闲时间使用[Backbone][]重写了该地址本应用([demo][], [source][])。
<!--more-->

在使用[Backbone][]的过程中，对其的总体感觉是能让页面逻辑层次更清楚，与传统的服务器端MVC结构非常类似：

- 通过将View的方法绑定到Model/Collection的CRUD事件，可以让数据的变化能自动触发页面的更新；
- 一个View可以由多个相同或者不同类型的子View聚合而成，所有View都提供render函数供父View的render函数进行调用，所有View对象的聚合就生成了整个页面dom；
- View通过HTML template，将绑定的Model渲染成dom元素，从某种程度上说，View更像MVC结构里的Controller；
- Collection是Model的集合，紧密耦合了[Underscore][]的所有方法，相对传统javascript语句，提供了更加便捷的集合数据的运算；
- Router提供了全局的页面逻辑路由，任何用户的操作，都可以通过[Router.navigate](http://documentcloud.github.com/backbone/#Router-navigate)进行全局状态的跳转；
- [Backbone][]内置支持了$函数，如果页面包含有[jQuery][]或者[Zepto][]；
- 用户可以通过Sync函数，来绑定页面Model和服务器端RESTful接口提供的数据；

下面是重写的地址本应用的全部javascript代码，也可以上[github][source]查看所有的源代码([演示][demo])：
{% include_code backbone-contacts/js/application.js %}

参考资料：

 - [hello-backbonejs](http://arturadib.com/hello-backbonejs/)，step by step的入门教程；
 - [backbonetutorials](http://backbonetutorials.com/)，比较基础的教程；
 - [backbone-fundamentals](http://addyosmani.github.com/backbone-fundamentals/)，有时间就多看看这个吧，比较深入，同时也提供了很多例子讲如何与Ruby，[Node.js](http://nodejs.org/)配合使用；
 - [Backbone][]官网，一切资料的根本；