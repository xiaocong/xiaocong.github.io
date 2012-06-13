---
layout: post
title: "Metaclasses in Python"
date: 2012-06-12 22:26
comments: true
categories: [python]
---

[metaclass]: http://en.wikipedia.org/wiki/Metaclass
[PEP 3115]: http://www.python.org/dev/peps/pep-3115/ Metaclasses in Python

## 什么是 metaclass ?

{% blockquote http://en.wikipedia.org/wiki/Metaclass Metaclass %}
In object-oriented programming, a metaclass is a class whose instances are 
classes. Just as an ordinary class defines the behavior of certain objects, a
metaclass defines the behavior of certain classes and their instances.
{% endblockquote %}

简单的说, metaclass 就是 class 类型对象的 class, metaclass 的实例对象是 class 类型对象.

## metaclass 能用来做什么 ?

我们就可以用 metaclass 来动态生成或者更改 class 的定义.

下面分别是通过传统 class 方式以及 metaclass 动态定义类 `A`
``` python 传统 class 方式定于类 A
class A(object):
    a = 'I am a string.'
```

``` python metaclass 动态定义类 `A`
A = type('A', (object,), {'a': 'I am a string.'})
```

上面我们通过`type`类的实例化来生成类`A`, 如果我们想自定义类的生成, 我们可以以`type`类为基
类派生出自定义的 metaclass.

*注: 本文所有代码在 python2.6 下能执行通过, 不能确保在 python3 下无误.*

<!-- more -->

## 继承`type`类实现 metaclass

我们可以从`type`类派生出新的 metaclass, 然后通过重新实现`__new__`, `__init__`,
`__call__`来实现类或者类实例的生成.

``` python Meta类 meta.py
class Meta(type):
    def __call__(self):
        print 'Enter Meta.__call__: ', self
        obj = type.__call__(self)
        print 'Exit Meta.__call__: ', obj
        return obj

    def __new__(metacls, name, bases, dictionary):
        print 'Enter Meta.__new__:', metacls, name, bases, dictionary
        newClass = type.__new__(metacls, name, bases, dictionary)
        print 'Exit Meta.__new__: ', newClass
        return newClass

    def __init__(cls, name, bases, dictionary):
        print 'Enter Meta.__init__: ', cls, name, bases, dictionary
        super(Meta, cls).__init__(name, bases, dictionary)
        print 'Exit Meta.__init__'

print 'Create class A'
A = Meta('A', (object,), {})

print
print 'Create instance of class A'
A()
```

当我们运行上述的python文件, 会得到下面的输出结果:
``` bash
$ python meta.py 
Create class A
Enter Meta.__new__: <class '__main__.Meta'> A (<type 'object'>,) {}
Exit Meta.__new__:  <class '__main__.A'>
Enter Meta.__init__:  <class '__main__.A'> A (<type 'object'>,) {}
Exit Meta.__init__

Create instance of class A
Enter Meta.__call__:  <class '__main__.A'>
Exit Meta.__call__:  <__main__.A object at 0xb76a9ccc>
$
```

通过上面的输出结果, 我们可以看出:

- `Meta.__new__`是用来生成类`A`的**类型对象**, 我们可以在调用`type.__new__`之前更改
  `dictionary`变量来增加/修改/删除新生成类`A`的成员变量/方法.
- `Meta.__new__`是在生成类`A`的**类型对象**后被调用类进行类`A`的初始化. 第一个参数`cls`
  是已经生成的类`A`类型对象, 可以通过直接修改`cls`来修改类的定义, 例如增加成员变量.
- `Meta.__call__`是在生成类`A`的**实例对象**时被调用的, 通过调用`type.__call__`可以
  生成该实例对象`obj`, 之后我们可以直接修改`obj`来实现实例对象的自定义.

## 如何使用 metaclass ?

- 我们可以直接调用`type`或者`Meta`来*动态*生成新的类型对象`A`: 

``` python 实例化Meta来生成新的类
A = Meta('A', (object,), {})
```

- 在定义类的时候, 重新指定该类的`__metaclass__`属性为`Meta`:

``` python 构建类的__metaclass__
class A(object):
    __metaclass__ = Meta
    # other member variables/methods definition
```

注意: 定义`__metaclass__`生成的类`A`会增加`_A__metaclass`成员变量, 在某些场景下需要
了解到这个区别.

## 函数方式定义类的 metaclass

类的`__metaclass__`可以是一个`type`类型的子类, 也可以是一个函数, 该函数接受三个参数:

- *name*: 字符串类型, 表示新生成类型对象的名称
- *bases*: tuple类型, 新生成类型对象的父类列表
- *properties*: 字典类型, 新生成类型对象的属性

该函数必须返回新生成的类型对象. 下面例子是一个简单实现:

``` python
def meta_func(name, bases, properties):
    # you can modify bases, properties here to overide class creation
    return type(name, bases, properties)

class A(object):
    __metaclass__ = meta_func
```

## 使用 metaclass 的案例

- 动态修改类的方法和属性, 例如给方法增加`decorator`
- 类的序列化和反序列化
- 在生成类的时候进行接口检查和接口注册
- 对第三方库进行`monkey patch`
- 生成代理类
- 动态mixin
- 控制实例对象的生成, 例如单体实例, 监控所有生成的实例对象

搜索[stackoverflow](http://stackoverflow.com/search?tab=votes&q=python%20metaclass)
能找到大量使用 metaclass 的设计模式.

## 使用 metaclass 的原则

metaclass 会降低代码的可读性, 并且很多使用 metaclass 的场景都有替代方案, 因此必须牢记下面的
忠告:

{% blockquote Python Guru Tim Peters %}
Metaclasses are deeper magic than 99% of users should ever worry about. If you wonder whether you need them, you don’t (the people who actually need them know with certainty that they need them, and don’t need an explanation about why).
{% endblockquote %}

## 参考

- [Metaclass Programming In Python](http://gnosis.cx/publish/programming/metaclass_1.html)
- [Wikipedia: Metaclass](http://en.wikipedia.org/wiki/Metaclass)
- [Python Metaclasses: Who? Why? When?](http://www.vrplumber.com/programming/metaclasses.pdf)
