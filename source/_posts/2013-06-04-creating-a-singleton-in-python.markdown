---
layout: post
title: "在Python中生成单体实例的方法"
date: 2013-06-04 10:53
comments: true
categories: [python]
---

[StackOverflow]:  http://stackoverflow.com/

Python是很强力的编程语言，它即支持面向对象编程的特征，也支持很多函数式
编程的特征，同时还是一门动态语言。由于Python语言特征的多样性，对于同一
种设计需求，我们可以采用多种完全不同的方式进行实现。优秀的软件工程师总
能在这些实现方式中，根据他们的优劣，选择出最适合的方式。


下面的内容源自[StackOverflow][]的一篇文章：
[Creating a singleton in python](http://stackoverflow.com/questions/6760685/creating-a-singleton-in-python)
。

{% blockquote %}
这个问题不是为了讨论单体实例是否是有必要的，或者是反面模式，也不是为了挑起任何宗教式的战争，而是为了讨论如何用更Pythonic的方式，最佳地实现单体实例模式。
{% endblockquote %}

<!--more-->

## 方法1：装饰器(Decorator)

```python
def singleton(class_):
  instances = {}
  def getinstance(*args, **kwargs):
    if class_ not in instances:
      instances[class_] = class_(*args, **kwargs)
    return instances[class_]
  return getinstance

@singleton
class MyClass(BaseClass):
  pass

c = MyClass()
```

**优点**

- 装饰器在通常情况下比其他任何方式都要直观。

**缺点**

- 任何通过调用`MyClass()`能获得真的单体实例，但是`MyClass`本身却被装饰
  成一个函数(function)了，也就是说不能使用任何类方法和与类相关的函数如
  `isinstance`，`issubclass`等。
- 还能从`MyClass`继承一个子类么？

## 方法2：基类继承

```python
class Singleton(object):
  _instances = {}
  def __new__(class_, *args, **kwargs):
    if class_ not in class_._instances:
      class_._instances[class_] = super(Singleton, class_).__new__(class_, *args, **kwargs)
    return class_._instances[class_]

class MyClass(Singleton, BaseClass): #  这里Singleton必须放在其他基类前面
  pass

c = MyClass()
```

**优点**

- `MyClass`是真的类(class)。

**缺点**

- 多继承...得小心使用！

## 方法3：元类(Metaclass)

```python
class Singleton(type):
  _instances = {}
  def __call__(cls, *args, **kwargs):
    if cls not in cls._instances:
      cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
    return cls._instances[cls]

class MyClass(BaseClass):
  __metaclass__ = Singleton

c = MyClass()
```

**忧点**

- `MyClass`是真的类(class)
- 魔术般地覆盖了继承的案例。
- 有目的地使用`__metaclass__`，让阅读者明确地知道这个目的。

**缺点**

- 如果有的话，就是很多程序员不熟悉元类(MetaClass)。

## 方法4：装饰器(Decorator)返回相同名称的类(Class)

```python
def singleton(class_):
  class class_w(class_):
    _instance = None
    def __new__(class_, *args, **kwargs):
      if class_w._instance is None:
          class_w._instance = super(class_w, class_).__new__(class_, *args, **kwargs)
          class_w._instance._sealed = False
      return class_w._instance
    def __init__(self, *args, **kwargs):
      if self._sealed:
        return
      super(class_w, self).__init__(*args, **kwargs)
      self._sealed = True
  class_w.__name__ = class_.__name__
  return class_w

@singleton
class MyClass(BaseClass):
  pass

c = MyClass()
```

**优点**

- `MyClass`是真的类(class)
- 魔术般地覆盖了继承的案例。

**缺点**

- 生成一个新类有额外的开销没？每定义一个类，实际上生成了两个类来实现单
  体实例。通常情况下不是问题，但扩展的时候可能有麻烦。
- 对于`_sealed`属性有什么观点了？
- `MyClass`是另外一个具有同样名称的`MyClass`类的子类，是否有点怪诞？这
  就意味着**你不能在子类的方法中通过`super`方法调用基类的相同的方法**，
  因为这是递归调用。

---

上面列出了四种不同的方式实现了单体实例，分别用到了装饰器(Decorator)，
元类(MetaClass)，和多继承(Multiple Inheritance)等语言特征(实际上还有
很多其他实现方式)。如果程序中用不到类(class)相关的函数和方法，第一种
方法就已经足够了，否则我们只能考虑方法2、3或者4。

**还有没有更简单的方法了？？？**

抛开固有的思维模式，**keep it simple!**

在[stackoverflow](http://stackoverflow.com/a/6760726/1070484)上投票最
多的答案是：

{% blockquote %}
Modules are imported only once, everything else is overthinking. Don't use singletons and try not to use globals.
{% endblockquote %}

用代码解释就是：

- 定义一个模块，如`mymodule`

```python
# mymodule.py
class Foo(object):
  def somemethod(self):
    pass

some_global_variable = Foo()
```

- 在其他模块中引入该实例：

```python
from mymodule import some_global_variable as foo

foo.somemethod()
```
