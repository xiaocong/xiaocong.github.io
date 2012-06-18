---
layout: post
title: "美妙的Coffee-Script"
date: 2012-06-15 14:36
comments: true
categories: [javascript, coffeescript]
---

JavaScript是标准的函数式动态语言, 但却有Java的语法. 用Java的语法写JavaScript的代码, 就好比穿着西装进行散打, 的确很让人别扭. 

CoffeeScript对JavaScript的改造刚好切中要害, 用Ruby/Python的语法重新塑造了JavaScript, 抛弃掉Java语法上繁琐的要求, 让人可以用更简洁的方式写出优雅, 可读性更好的语句.

## 简洁

简洁意味着花更少的时间进行*coding*. 难道不是么? 我相信程序员都愿意去做真正意义的编程, 而不是枯燥地敲键盘*coding*.

大家可以对比一下CoffeeScript和JavaScript的语法, 看看CoffeeScript的简洁:

- [函数](http://coffeescript.org/#literals)
- [条件](http://coffeescript.org/#conditionals)
- [参数展开](http://coffeescript.org/#splats)
- [循环和列表推导](http://coffeescript.org/#loops)
- [数组切片](http://coffeescript.org/#slices)
- [类和继承](http://coffeescript.org/#classes)
- [析构赋值](http://coffeescript.org/#destructuring)

CoffeeScript的平均代码量估计不超过等价JavaScript代码量的50%.

<!--more-->

## 优雅

Coffee的代码看起来让人赏心悦目, 如同看诗一样:
``` coffeescript
# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)
```
同样的代码翻译成JavaScript代码, 看起来的心情可能就不一样了:
``` javascript
var cubes, list, math, num, number, opposite, race, square,
  __slice = [].slice;

number = 42;

opposite = true;

if (opposite) {
  number = -42;
}

square = function(x) {
  return x * x;
};

list = [1, 2, 3, 4, 5];

math = {
  root: Math.sqrt,
  square: square,
  cube: function(x) {
    return x * square(x);
  }
};

race = function() {
  var runners, winner;
  winner = arguments[0], runners = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return print(winner, runners);
};

if (typeof elvis !== "undefined" && elvis !== null) {
  alert("I knew it!");
}

cubes = (function() {
  var _i, _len, _results;
  _results = [];
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    num = list[_i];
    _results.push(math.cube(num));
  }
  return _results;
})();
```
一个是诗一般的代码, 另一个就是代码, 看起来心情能一样么?

## 可读性

有谁愿意一次又一次地花时间琢磨`for`循环到`n`还是`n-1`结束呢? 这种琢磨对于软件来说到底有多大意思? 我们是按照自然语言的方式进行思维, 如果也按照自然语言的方式写代码, 那我们的大脑就不会花无谓的时间进行翻译了.

看看下面CoffeeScript的代码， 是不是读完代码就明白了这段代码的意思?
``` coffeescript
foods = ['broccoli', 'spinach', 'chocolate']
eat food for food in foods when food isnt 'chocolate'
```
然后再对照等价的JavaScript代码, 读代码的过程中, 不知道你的大脑需要花多长时间进行翻译?
``` javascript
var food, foods, _i, _len;

foods = ['broccoli', 'spinach', 'chocolate'];

for (_i = 0, _len = foods.length; _i < _len; _i++) {
  food = foods[_i];
  if (food !== 'chocolate') {
    eat(food);
  }
}
```

## 效率

代码逻辑需要技巧, 而程序逻辑需要智慧. CoffeeScript尽可能地在语法上解决代码逻辑, 而让你的大脑更多地去思考程序逻辑.

## 示例

本示例将地址本的JavaScript的实现改写为CoffeeScript进行实现, 同时增加了Grunt的CoffeeScript编译任务, 主要改动包括:

- coffee源代码目录: coffee
- grunt coffee编译任务: tasks/coffee.js
- 更改grunt配置文件以支持coffee的编译: grunt.js

下面的链接你可以找到所有的源代码:

- [地址本-JavaScript源码](https://github.com/xiaocong/xiaocong.github.com/tree/source/source/examples/bbb-amd-backbone-contacts/)
- [地址本-CoffeeScript源码](https://github.com/xiaocong/xiaocong.github.com/tree/source/source/examples/coffee-bbb-amd-backbone-contacts/)
- [地址本-CoffeeScript演示]({{ root_url }}/examples/coffee-bbb-amd-backbone-contacts/index.html)

## 参考

- [CoffeeScript官网](http://coffeescript.org/)
- [The Little Book on CoffeeScript](http://arcturo.github.com/library/coffeescript/)
- [Smooth CoffeeScript](http://autotelicum.github.com/Smooth-CoffeeScript/)

