---
layout: post
title: "Python 面试问题"
date: 2013-06-16 12:36
comments: true
categories: [python]
---

[python-interview-QA]: http://ilian.i-n-i.org/python-interview-question-and-answers/

最近正在团队内部普及 Python 语言，有些刚接触 Python 语言的工程师在概念
上有很多混淆的地方，刚好看到这篇文章:[Python面试问题][python-interview-QA]，
里面列举的问题都是关于 Python 基本的常识或者容易混淆的知识点，因此推荐
给团队的 Python 初学者。

<!--more-->

1.  参数是如何传递的？传值还是传引用？(How are arguments passed – by
reference of by value?)

    这个问题的有点c/c++风格，问题的实质是当一个传入的参数在函数体内被
更改，那么在函数返回后，函数体外的这个参数变量的值是否改变。最简短的回
答是，"都不是"，事实上 Python 里是传对象(call by object)。

    要弄明白这个变量的值是否在函数体外发生变化，需要明白两个概念：

    - Python 里的对象分为有可变(mutable)和不可变(immutable)：数字(int,
      float)，字符串，元组(tuple)是不可变的，列表(list)，字典(dict)是可
      变的。
    - 所有的变量都是一个对象的引用。无论对象是否可变，这个变量都可被赋
      值为另外一个对象。

    因此，如果传入的参数变量指向一个不可变对象，那么在函数体外这个对象
的内容永远不会发生变化；如果当传入的参数变量指向一个可变对象，那么这个
对象是否发生变化，取决于函数体内部是否改变了这个可变对象的内容。

    下面的例子里，`changed`函数调用改变了传入对象的内容，`unchanged`函
数将`l`变量赋值为一个新生成的对象`l = l + ["a"]`，但原始对象并未发生变
化：
    {% gist 5791257 %}

2.  什么是列表和字典推导(list and dict comprehensions)？你能给个例子吗？

    列表/字典推导是一种语法糖(syntax sugar)，用来简化列表和字典的生成。
根据第三版的"Learning Python"，列表推导的执行速度快于通常的循环，但并
不确保以后的 Python 版本也是这个结果。
    {% gist 5791279 %}
    **列表推导是典型的 Pythonic 的代码书写方式。**

3.  什么是 PEP 8？

    PEP 8 定义的是 Python 代码规范，告诉你如何书写可读性强，更好维护的
代码。详细内容请参考
[PEP 8 官方文档](http://www.python.org/dev/peps/pep-0008/)。Sublime
Text编辑工具带有 PEP 8 格式检测插件，所存盘的文件都应当符合 PEP 8 的
规范。

4.  你使用虚拟环境(virtual environment)吗？

    很多 Python 程序员认为，包括我自己也是这样的观点，
[virtual environment](https://pypi.python.org/pypi/virtualenv)是一个非
常有用的工具，用来孤立你的开发和运行环境，特别是当需要同时开发多个项目，
基于不同的 Python 版本以及运行库的时候。每当新建一个项目，或者clone一
个已存在项目的时候，我都会按照下面的步骤建立和使用虚拟环境：
    {% gist 5791351 %}

5.  如何计算列表里所有元素的和？如何计算列表里所有元素的乘积？

    这个问题相当简单，但需要记住一点，你需要用 Pythonic 的方式来解答这
个问题：
    {% gist 5791391 %}

6.  你能列出列表(list)和元组(tuple)的区别吗？举例子说明用法的不同。

    列表和元组是 Python 里最基本的两个数据类型：

    - 首先，列表对象是可变的(mutable)，但元组不是；
    - 其次，元组可被哈希(hashed)，例如可以用作字典对象的键值(key)；

    至于例子，地图上的地理坐标可以用二元组表示，而地图上的路径可以用坐标
点列表来表示。

7.  你知道`range`和`xrange`的区别吗？

    `range`函数返回的是一个列表对象，`xrange`返回的是一个`xrange`对象。
他们的主要区别是：
    - 内存的占用不同。列表对象已经在内存中存在了，而`xrange`对象永远占
      用同样的内存大小，无论需要生成的`range`有多大。
    - `xrange`对象不能使用列表对象的切片函数，也就是说
      `range(10)[3:5]`能工作，但是`xrange(10)[3:5]`就不工作了。

    类似的问题还有：`map`和`itertools.imap`的区别？`filter`和
`itertools.ifilter`的区别？清楚这些区别，你就能知道怎样更有效地使用这
些函数。

8.  请说出一些 python2.x 与 python3.x 之间的区别。

    如果你经常看网上的文章，你肯定能说出一些区别：

    - python3.x 的字符串都是unicode；
    - python3.x 中`print`是函数，而不是语句；
    - python3.x 中使用`range`代替了`xrange`，删除了`xrange`函数；
    - python3.x 中全部类(class)都是新类型(new style)；
    - python3.x 支持更简单的`unpack`方式，如`first, *middle, last = [0, 1, 2, 3, 4, 5, 6, 7]`

    如果你一条区别也说不出来，至少说明你对 Python 的关注度不够。

9.  什么是修饰器(Decorator)？你能说出它的用途吗？

    修饰器(Decorator)也是一种非常 Pythonic 的方式，它可以让你非常方便
地注入(inject)或者修改函数和类的代码。换句话说，修饰器允许你包装函数和
类方法，在执行原始代码之前和之后执行其他的代码。修饰器语法能带来很多非
常有意思的编码方式，例如：
    - 内存缓存
    
        {% gist 5791608 %}
    
    - 参数检测
    
        {% gist 5791624 %}

10.  `with`语句及其用法？

    简单地说，`with`语句允许你在进入和/或退出指定的代码块的时候，执行
特定的代码。最常用的例子是使用`with`语句打开文件。为了在你自己定义的对
象上使用`with`语句，你必须定义`__enter__`和`__exit__`方法。

    更多的信息你可以查看[理解 Python 的 with 语句](http://effbot.org/zone/python-with-statement.htm)。

---

除了原文列举上述问题，下面知识点也是 Python 面试中很可能被问到的：

- Package/Module的定义，以及模块加载原则；
- 如何构建你自己的类型，如列表(list)，字典(dict)，迭代器(iterator)；
- 生成器(generator)的概念以及使用方式；
- built-in 类型和函数；
- 对象属性的操作原理，如__dict__，__getattr__，__getattribute__，描述
  器(descriptor)；
- 元类编程(metaclass)的概念，以及如何使用；
- 如何进行Package/Module的打包和分发；
- 什么是WSGI；
- 字符串的处理和正则表达式；
- 如何操作json和xml数据；

另外，还必须尽可能地多了解 Python 语言最为强大的
[库函数](http://docs.python.org/2/library/)。
