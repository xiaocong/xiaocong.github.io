---
layout: post
title: "使用jasmine+sinon测试backbone+requirejs项目"
date: 2012-07-06 00:32
comments: true
categories: [javascript, backbone.js, require.js, jasmine.js, sinon.js, coffeescript]
---

[backbone]: http://backbonejs.com/ "Backbone.js"
[underscore]: http://documentcloud.github.com/underscore/ "Underscore.js"
[requirejs]: http://requirejs.org/ "Require.js"
[sinon]: http://sinonjs.org/ "sinon.js"
[jasmine]: http://pivotal.github.com/jasmine/

我们必须为自己的代码写自动测试代码, 并且需要持续地对自己的代码进行回归测试, 因为:

- 项目成员对模块间接口的理解必须一致, 测试代码是最好的文档.
- 谁都没十足的把握保证自己的修改不影响别人的代码.
- 没有快速而充分的测试作为保障, 就很难提倡快速重构.
- 让代码成为资产, 而不是债务, 减少代码的维护成本.
- 每个人都必须为自己的代码负责.

那么基于[backbone][]+[requirejs][]的前端项目应当如何实施测试?

当前已经有很多非常优秀的javascript测试框架, 包括[jasmine][],
[QUnit](http://docs.jquery.com/QUnit), [mocha](http://visionmedia.github.com/mocha/).
[backbone][]和[requirejs][]的前端项目可以使用上述任何一种测试框架. 技术经理可以根据团队成员的技术背景, 喜好来决定选择哪一种测试框架.

下面就以[Contacts](/examples/coffee-bbb-amd-backbone-rest-contacts/index.html)应用为例,
简单demo如何在项目中实现基于[jasmine][]+[sinon][]的测试用例.

- [源码](https://github.com/xiaocong/xiaocong.github.com/tree/master/examples/coffee-bbb-amd-backbone-rest-contacts)
- [测试执行demo](/examples/coffee-bbb-amd-backbone-rest-contacts/tests/SpecRunner.html)

## 工程的目录结构
``` bash
|-coffee                # web应用coffeescript源代码
|-app                   # coffee编译之后的web应用js文件
|-dist
   |-debug              # concat所有js文件到一个js文件, 但未作minize
   |-release            # concat所有js文件到一个js文件, 并且minize
|-assets                # jquery/requirejs/underscore/backbone等库文件
|-tests
   |-coffee             # 测试程序的coffeescript源代码
      |-config.coffee   # requirejs配置文件
      |-runner.coffee   # 按照requirejs模块定义规范定义的jasmine测试执行模块
   |-js                 # coffee编译之后的测试程序js文件
   |-lib                # jasmine/sinon等测试用库文件
   |-SpecRunner.html    # 测试html文件, 用来执行broqser端测试代码
|-index.html            # app html文件
|-favicon.ico
|-grunt.js              # grunt任务配置文件
```

## 按照[requirejs][]的模块定义方式定义*测试模块*

由于*被测模块*是由[requirejs][]进行加载的, 因此, 我们也可以遵循[requirejs][]的模块定义方式定义*测试模块*, 确保*被测模块*在*测试模块*前加载完成:
``` coffeescript model_spec.coffee
define [use!underscore', 'use!backbone', 'model/under/test'], (_, Backbone, model) ->
  describe "suite description...", ->
    it "spec description...", ->
      # test code here ...
```
下面是测试用例的代码(`collection`, `model`, `view`各实现了一个模块的测试, 仅供demo):

- [Collection测试Dmeo](/examples/coffee-bbb-amd-backbone-rest-contacts/tests/coffee/spec/collections/contacts.coffee)
- [Model测试Demo](/examples/coffee-bbb-amd-backbone-rest-contacts/tests/coffee/spec/models/contact.coffee)
- [View测试Demo](/examples/coffee-bbb-amd-backbone-rest-contacts/tests/coffee/spec/views/contactitem.coffee)

## 加载*测试模块*, 定义测试`runner`

通过定义模块依赖, 确保在执行`runner`方法前加载所有的*测试模块*.

{% include_code SpecRunner lang:coffeescript coffee-bbb-amd-backbone-rest-contacts/tests/coffee/runner.coffee %}

## 定义[requirejs][]的配置文件, 执行测试`runner`

由于我们希望通过一个配置文件同时加载*被测模块*和*测试模块*, 因此这里`require.config`的`baseUrl`项必须与web应用的该值保持一致.

{% include_code require.config lang:coffeescript coffee-bbb-amd-backbone-rest-contacts/tests/coffee/config.coffee %}

## 定义`SpecRunner.html`, 用来在浏览器端执行策测试代码

{% include_code SpecRunner.html lang:coffeescript coffee-bbb-amd-backbone-rest-contacts/tests/SpecRunner.html %}

下面是[测试执行](/examples/coffee-bbb-amd-backbone-rest-contacts/tests/SpecRunner.html)的结果:

<iframe src="/examples/coffee-bbb-amd-backbone-rest-contacts/tests/SpecRunner.html" width="100%" scrolling="no"></iframe>

## 遗留问题

- 由于*被测模块*的加载是由[requirejs][]完成的, 那么如何在加载时mock*被测模块*的依赖模块?
- 如何和CI系统集成, 提供命令行方式的浏览器环境进行测试? 尝试过[envjs](http://www.envjs.com/), 但[requirejs][]总在加载模块时出错, 还没能进一步研究出错细节.

