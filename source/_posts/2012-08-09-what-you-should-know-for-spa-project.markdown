---
layout: post
title: "开发SPA前端项目必须掌握什么知识?"
date: 2012-08-09 21:46
comments: true
categories: 
---

这个题目有点大, 因为对于开发SPA(单页面应用, Single Page Application), 一个前端工程师需要掌握太多太多知识和工具了.
这里只说我自己在摸索和研究前端SPA相关技术的过程中的一些经验和总结.

## 选择合适的开发IDE

一个好的IDE可以让你敲键盘的次数大大减少, 我个人推荐使用[Sublime Text](http://www.sublimetext.com/).

## 选择合适的开发语言

呃, 难道还有别的选择? 开发前端应用不都是用Javascript么? 对的, 因为现在有了[CoffeeScript](http://coffeescript.org/).
相比于Javascript的类C++/Java静态语言语法, CoffeeScript提供了更贴近自然语言的动态语言语法, 更少的代码, 更少的语法漏洞, 更好的代码可读性.

## 选择合适的Javascript前端MVC框架

Javascript程序很难调试, 特别是当代码行数超过一定量级之后.
为了让程序逻辑更有条例, 与服务器端的web框架类似, 前端也有很多Javascript库或者框架提供了MVC或类MVC架构.
按照MVC架构进行设计, 可以很清晰地将Module(数据模块), View(页面展示), Controller(用户行为响应控制)进行分离.
对于小型web应用来说, 这可能无关紧要, 但对于一个超过上千行的web应用来说, 一个清晰的程序架构可以极大减少模块间的耦合性.

大家可以仔细看一下[Top 10 Javascript MVC框架的对比](http://codebrief.com/2012/01/the-top-10-javascript-mvc-frameworks-reviewed/).
我个人感觉而言, [Backbone](http://documentcloud.github.com/backbone/)的代码更紧凑一些, 开发社区也比较活跃.

## 模块定义与加载管理

Javascript语言自身不提供代码的加载管理, 当JavaScript代码分成多个模块, 处于不同文件中时,
如何管理模块之间的依赖关系以及文件的加载顺序, 就会变成一个非常棘手的事情. 并且JavaScript自身不提供名字空间的管理, 不同模块,
不同的JavaScript库之间的都有可能出现命名冲突.

[AMD(Asynchronous Module Definition)](https://github.com/amdjs/amdjs-api/wiki/AMD)是用来规范如何定义模块及其依赖项, 以及如何异步加载模块.
大家可以参考[Addy Osmani](http://twitter.com/addyosmani)的博文[Writing Modular JavaScript With AMD, CommonJS & ES Harmony](http://addyosmani.com/writing-modular-js/)来了解具体的细节.

目前前端使用最广泛的前端AMD库应当是[RequireJS](http://requirejs.org/).

## 代码质量静态检查

Javascript代码的书写格式非常自由, 甚至带着错都能运行下去, 这也是为什么JavaScript代码很难调试的原因之一.

进行代码质量的静态检查可以极大减少由于语法漏洞或者拼写疏忽带来的这些额外错误, 推荐使用[jshint](http://www.jshint.com/).
如果使用CoffeeScript, 这步可以省略了, CoffeeScript编译后的代码都能通过jshint的检测.

## 单元测试

单元测试是一个非常大的话题, 我没有办法用简短的一段话或者一篇文章将单元测试涉及到的方法和工具都介绍清楚.

技术大牛们都不愿意做单元测试, 当然, 很少有软件工程师愿意承认自己不是技术大牛:).
因为成本或者时间因素, 让工程师们都愿意舍弃单元测试, 去保证功能的实现. 这里我不想说教,
但我的经验的确是, 单元测试能很大加深程序员对代码的理解程度, 加速个人能力的提升.

从项目角度上看, 技术经理需要权衡当前的开发, 回归测试和后继的代码维护成本之间的平衡, 然后决定是否实施单元测试,
这是技术经理的职责.

在前端web应用中比较常用的单元测试框架包括：

- [Jasmine](http://pivotal.github.com/jasmine/)
- [QUnit](http://docs.jquery.com/QUnit)
- [Mocha](http://visionmedia.github.com/mocha/)

Mock库可以采用[SinonJS](http://sinonjs.org/). 如果愿意, 还可以采用[Should](http://github.com/visionmedia/should.js),
[Expect](https://github.com/LearnBoost/expect.js), [Chai](http://chaijs.com/)等Assertion库.

另外, 如果希望在持续集成中加入对测试的支持, 还需要加入Non-GUI浏览器的支持, 目前采用比较多的方案是:

- [PhantomJS](http://phantomjs.org/)
- [Zombie](http://zombie.labnotes.org/)

由于[Zombie](http://zombie.labnotes.org/)当前的版本还不能支持[RequireJS](http://requirejs.org/), 因此我更倾向于使用[PhantomJS](http://phantomjs.org/).

## Minification & Concatenation

为了提高web应用的加载速度, 必须对Javascript文件, CSS文件进行Minification和Concatenation, 根据经验, 优化后的代码加载速度比优化前的要提高数倍.

常用的工具包括:

- [YUI Compressor](http://developer.yahoo.com/yui/compressor/)
- [Google Closure Compiler](http://code.google.com/closure/compiler/)
- [UglifyJS](https://github.com/mishoo/UglifyJS/)

大部分开源的JavaScript构建工具都集成了对这些工具的支持, 因此没必要在这些工具上面花太多精力.
使用了[RequireJS](http://requirejs.org/)的应用, 可以直接使用其自带的[r.js](http://requirejs.org/docs/optimization.html)进行代码优化.

## 构建和部署

任何web应用工程都需要构建和部署, 一个自动化的构建和部署脚本能让编程人员更加专注于应用本身, 而不被繁琐的流程所困扰.
自动化的构建和部署是一个web前端项目最基本的要求, 当项目开始的时候, 项目组最好能在头两个迭代周期就完成自动化的构建和部署脚本的开发.

目前使用比较多的构建工具有:

- [js-build-tools](https://github.com/moxiecode/js-build-tools)
- [jake](https://github.com/jcoglan/jake/)
- CoffeeScript自带的[cake](http://coffeescript.org/#cake)
- make
- [grunt](https://github.com/cowboy/grunt)

我个人比较倾向于[grunt](https://github.com/cowboy/grunt), 如果工程中用了[RequireJS](http://requirejs.org/),
[bbb](https://github.com/backbone-boilerplate/grunt-bbb)(grunt扩展)是更好的选择.

在[网络地址本例子工程](https://github.com/xiaocong/xiaocong.github.com/tree/master/examples/coffee-bbb-amd-backbone-rest-contacts)中,
我使用`grunt/bbb`开发了构建和部署脚本, 可以完成:

- 文件的复制和清除
- CoffeeScript的编译
- JSHint
- Minification & Concatenation
- 在Phantom环境下运行Jasmine单元测试
- Debug/Release Web服务器

感兴趣的人可以去看看`grunt.js`配置文件, 也可以将这个例子工程作为web前端项目的模板.

**下面的几点感触和具体的技术细节无关, 但是我个人觉得, 对于每个想以编程作为自己职业规划的程序员来说, 这几点尤其重要.**

## 了解业界的技术发展动态

软件技术发展很快, 对于热爱技术的程序员来说, 必须经常更新自己的知识, 才能保证自己不会落伍.
因此, 每天都需要花一定时间去阅读, 了解行业最新的技术发展动态.

我的习惯是用Google Reader订阅几个经常更新的前端技术相关的RSS:

- [Addy Osmani's Blog](http://addyosmani.com/blog/)
- [DailyJS](http://dailyjs.com/)
- [HTML5研究小组](http://www.mhtml5.com/)

另外, 有些邮件周报也很不错:

- [JavaScript Weekly](http://javascriptweekly.com/)
- [HTML5 Weekly](http://html5weekly.com/)

## 多阅读开源代码, 最好参与感兴趣的开源项目

[GitHub](http://github.com/)是一个非常有用的站点, 在上面能看到那些大牛们是怎么讨论问题, 如何思考问题, 以及如何实现或者修正的.
阅读开源项目的文档能了解概要, 如果需要了解细节, 最有效的方式是阅读代码, 特别是看针对问题的提交记录.

## 善于利用互联网工具

### 遇到问题的时候, 要知道如何去寻找问题的答案

[StackOverflow](http://stackoverflow.com/)是一个非常有名的编程问答站点, 我所遇到的大部分编程问题都能在上面找到答案,
即便没有答案, 也能找到其他人对这个问题的考虑. 另外, 别忘了强大的[Google Search](http://www.google.com/). 如果Google被墙, 可以考虑用[Bing](http://www.bing.com/).
我不喜欢[百度](http://www.baidu.com/), 因为其搜索的命中率太低了.

### 善于使用云端的工具

选择合适的工具对于软件项目来说, 可以极大地提高工作效率, 起到事半功倍的效果. 好的商业软件大多需要支付巨额的费用, 并且搞不好还水土不服.
为了控制成本, 可以多尝试尝试云端的工具. 在[知乎](http://www.zhihu.com/question/20114578)上有关于这些工具的讨论, 大家有兴趣可以去看看别人怎么做的.

### 多参与技术社区活动, 学会分享

多参加技术社区的活动, 包括线上的技术解答, 以及线下的技术讲座等. 分享越多, 获得也就越多.

