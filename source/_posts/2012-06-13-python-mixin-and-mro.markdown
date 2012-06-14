---
layout: post
title: "Python mixin and MRO"
date: 2012-06-13 23:09
comments: true
categories: [python]
---

## 什么是 mixin ?

{% blockquote Wikipedia http://en.wikipedia.org/wiki/Mixin Mixin %}
In object-oriented programming languages, a mixin is a class that provides a certain functionality to be inherited or just reused by a subclass, while not meant for instantiation (the generation of objects of that class). Mixins are synonymous with abstract base classes. Inheriting from a mixin is not a form of specialization but is rather a means of collecting functionality. A class or object may "inherit" most or all of its functionality from one or more mixins, therefore mixins can be thought of as a mechanism of multiple inheritance.
{% endblockquote %}

简单的说, mixin 是一种类的多继承的机制.

## 什么时候需要 mixin ?

就如[stackoveflow](http://stackoverflow.com/questions/533631/what-is-a-mixin-and-why-are-they-useful)
上的回答, 有两个主要的使用 mixin 的场景:

- 你希望给一个类提供很多可选的特征(feature).
- 你希望在很多不同的类中使用一个特定的特征(feature).

例如, [werkzeug](http://werkzeug.pocoo.org/docs/wrappers/) 的`request`, `response`系统.
我们可以实现简单`request`如下:

``` python
from werkzeug import BaseRequest

class Request(BaseRequest):
    pass
```

如果我们希望支持`accept header`, 可以这样实现:
``` python
from werkzeug import BaseRequest, AcceptMixin

class Request(BaseRequest, AcceptMixin):
    pass
```

如果我们希望`request`对象支持`accept header`, `etags`, `authentication`, `user agent`, 可以这样实现:
``` python
from werkzeug import BaseRequest, AcceptMixin, ETagRequestMixin, UserAgentMixin, AuthorizationMixin

class Request(BaseRequest, AcceptMixin, ETagRequestMixin, UserAgentMixin, AuthorizationMixin):
    pass
```

## Mixin 的实现

假定我们有下面两个类需要mixin:
``` python
class Base(object):
    pass

class FeatureMixin(object):
    pass
```

- 直接定义一个类 mixin 所有的 feature
``` python
class MyClass(Base, FeatureMixin):
    pass
```

- 通过闭包动态定义类来实现 Mixin 
``` python
def mixin(base, mixin, name):
    class MixinClass(base, mixin):
        pass
    MixinClass.__name__ = name
    return MixinClass

MyClass = mixin(Base, FeatureMixin, 'MyClass')
```

- 使用`type`动态构造类来实现 Mixin
``` python
MyClass = type('MyClass', (Base, FeatureMixin), {})
```

- 更改`__bases__`来实现 Mixin. *只能 mixin `classic class`*
``` python
class Base(object):
    pass

class FeatureMixin: # not inherite from object
    pass

Base.__bases__ += (FeatureMixin,) # then Base should have FeatureMixin
```

## MRO(Method Resolution Order)

{% blockquote Wikipedia http://en.wikipedia.org/wiki/Diamond_problem Diamond problem %}
In object-oriented programming languages with multiple inheritance, the diamond problem (sometimes referred to as the "deadly diamond of death") is an ambiguity that arises when two classes B and C inherit from A, and class D inherits from both B and C. If D calls a method defined in A (and does not override the method), and B and C have overridden that method differently, then from which class does it inherit: B, or C?
{% endblockquote %}

多继承时, 运行环境必须知道调用哪一个父类的方法. Python2.3开始采用`C3`方法解析顺序([Method Resolution Order][], 简称MRO)来动态解析调用的方法.

``` python
>>> O = object
>>> class A(O): pass
>>> class B(O): pass
>>> class X(A,B): pass
>>> class Y(B,A): pass
>>> X.mro()
[<class '__main__.X'>, <class '__main__.A'>, <class '__main__.B'>, <type 'object'>]
>>> Y.mro()
[<class '__main__.Y'>, <class '__main__.B'>, <class '__main__.A'>, <type 'object'>]
```

参照上面代码执行的结果, 我们可以看出, `class X`的 MRO 是 `<class '__main__.X'>, <class '__main__.A'>, <class '__main__.B'>, <type 'object'>`.
当我们调用`X`实例对象的某个方法, 运行环境会按照`X, A, B, object`顺序解析该方法. 越左边的越优先,
也就是说如果只有`A`, `B`定义了这个方法, 系统会选择最先解析到的方法, 也就是`A`的方法定义.
同样, `class Y`的 MRO 是 `<class '__main__.Y'>, <class '__main__.B'>, <class '__main__.A'>, <type 'object'>`,
对于`Y`来说, `B`的方法要优先于`A`进行解析.

上面定义的类`X`和`Y`对`A`和`B`的方法解析顺序是刚好相反的, 如果有一个类继承于`X`和`Y`会出现什么结果?

``` python
>>> class M(X, Y): pass
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: Error when calling the metaclass bases
    Cannot create a consistent method resolution
order (MRO) for bases B, A
```
上面的错误说明, 类的继承必须保持一致的 MRO. 由于基类`X`和`Y`的 MRO 有冲突, 因此我们不可能从`X`和`Y`继承另外一个类.

关于 MRO 的算法可以参考官网上的[Python 2.3 方法解析顺序][Method Resolution Order].

[Method Resolution Order]: http://www.python.org/getit/releases/2.3/mro/ MRO

