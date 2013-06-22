---
layout: impress
title: "符合语言习惯的Python编程"
date: 2013-06-21 14:59
---

<div id="main" class="step" >
  <h1>符合语言习惯的Python编程</h1>
  <p class="footer">
    <span>Jun 2013</span> ·
    <span>He, Xiaocong</span>
  </p>
</div>

<div id="python-idiomatic" class="step" data-x="-2500" data-y="-1000">
  <blockquote style="text-align: left;">Programs must be written for people to read,
and only incidentally for machines to execute.<br><br>
程序必须先让人读懂，然后才能让计算机执行。<br><br>
    <div style="text-align: right;">
      <span style="font-style: italic;">- Abelson &amp; Sussman</span>
    </div>
  </blockquote>
</div>

<div id="pep8" class="step" data-x="-1500" data-y="-1000">
  <h2>PEP 8: Style Guide for Python Code</h2>
  <p/>
  <p class="substep" style="text-align: center;"><a href="http://www.python.org/dev/peps/pep-0008/">http://www.python.org/dev/peps/pep-0008/</a></p>
</div>

<div id="swap" class="step" data-x="-500" data-y="-1000">
  <h3>交换赋值</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">temp = a
a = b
b = a  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">a, b = b, a  #  先生成一个元组(tuple)对象，然后unpack  </code></pre>
</div>

<div id="unpacking" class="step" data-x="500" data-y="-1000">
  <h3>Unpacking</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">l = ['David', 'Pythonista', '+1-514-555-1234']
first_name = l[0]
last_name = l[1]
phone_number = l[2]  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">l = ['David', 'Pythonista', '+1-514-555-1234']
first_name, last_name, phone_number = l

# Python 3 Only
first, *middle, last = another_list  </code></pre>
</div>

<div id="in" class="step" data-x="1500" data-y="-1000">
  <h3>使用操作符in</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">if fruit == "apple" or fruit == "orange" or fruit == "berry":
    # 多次判断  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">if fruit in ["apple", "orange", "berry"]:
    # 使用 in 更加简洁  </code></pre>
</div>

<div id="string-op" class="step" data-x="2500" data-y="-1000">
  <h3>字符串操作</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">colors = ['red', 'blue', 'green', 'yellow']

result = ''
for s in colors:
    result += s  #  每次赋值都丢弃以前的字符串对象, 生成一个新对象  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">colors = ['red', 'blue', 'green', 'yellow']
result = ''.join(colors)  #  没有额外的内存分配  </code></pre>
</div>

<div id="dict-op-1" class="step" data-x="-2500">
  <h3>字典键值列表</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">for key in my_dict.keys():
    #  my_dict[key] ...  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">for key in my_dict:
    #  my_dict[key] ...

# 只有当循环中需要更改key值的情况下，我们需要使用 my_dict.keys()
# 生成静态的键值列表。  </code></pre>
</div>

<div id="dict-op-2" class="step" data-x="-1500">
  <h3>字典键值判断</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">if my_dict.has_key(key):
    # ...do something with d[key]  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">if key in my_dict:
    # ...do something with d[key]  </code></pre>
</div>

<div id="dict-default" class="step" data-x="-500">
  <h3>字典 get 和 setdefault 方法</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">navs = {}
for (portfolio, equity, position) in data:
    if portfolio not in navs:
            navs[portfolio] = 0
    navs[portfolio] += position * prices[equity]</code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">navs = {}
for (portfolio, equity, position) in data:
    # 使用 get 方法
    navs[portfolio] = navs.get(portfolio, 0) + \
                      position * prices[equity]
    # 或者使用 setdefault 方法
    navs.setdefault(portfolio, 0)
    navs[portfolio] += position * prices[equity]</code></pre>
</div>

<div id="testing-true-false" class="step" data-x="500">
  <h3>判断真伪</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">if x == True:
    # ....
if len(items) != 0:
    # ...
if items != []:
    # ...  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">if x:
    # ....
if items:
    # ...  </code></pre>
</div>

<div id="enumerate" class="step" data-x="1500">
  <h3>遍历列表以及索引</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">items = 'zero one two three'.split()
# method 1
i = 0
for item in items:
    print i, item
    i += 1
# method 2
for i in range(len(items)):
    print i, items[i]</code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">items = 'zero one two three'.split()
for i, item in enumerate(items):
    print i, item</code></pre>
</div>

<div id="list-comprehensions" class="step" data-x="2500">
  <h3>列表推导</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">new_list = []
for item in a_list:
    if condition(item):
        new_list.append(fn(item))  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">new_list = [fn(item) for item in a_list if condition(item)]  </code></pre>
</div>

<div id="nested-list-comprehensions" class="step" data-x="-2500" data-y="1000">
  <h3>列表推导-嵌套</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">for sub_list in nested_list:
    if list_condition(sub_list):
        for item in sub_list:
            if item_condition(item):
                # do something...  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">gen = (item for sl in nested_list if list_condition(sl) \
            for item in sl if item_condition(item))
for item in gen:
    # do something...  </code></pre>
</div>

<div id="product" class="step" data-x="-1500" data-y="1000">
  <h3>循环嵌套</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">for x in x_list:
    for y in y_list:
        for z in z_list:
            # do something for x & y  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">from itertools import product
for x, y, z in product(x_list, y_list, z_list):
    # do something for x, y, z  </code></pre>
</div>

<div id="generator" class="step" data-x="-500" data-y="1000">
  <h3>尽量使用生成器代替列表</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">def my_range(n):
    i = 0
    result = []
    while i < n:
        result.append(fn(i))
        i += 1
    return result  #  返回列表</code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">def my_range(n):
    i = 0
    result = []
    while i < n:
        yield fn(i)  #  使用生成器代替列表
        i += 1</code></pre>
  <p><sup>*</sup>尽量用生成器代替列表，除非必须用到列表特有的函数。</p>
</div>

<div id="generator-first" class="step" data-x="500" data-y="1000">
  <h3>中间结果尽量使用imap/ifilter代替map/filter</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">reduce(rf, filter(ff, map(mf, a_list)))</code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">from itertools import ifilter, imap
reduce(rf, ifilter(ff, imap(mf, a_list)))</code></pre>
  <p><sup>*</sup>lazy evaluation 会带来更高的内存使用效率，特别是当处理大数据操作的时候。</p>
</div>

<div id="built-in-any" class="step" data-x="1500" data-y="1000">
  <h3>使用any/all函数</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">found = False
for item in a_list:
    if condition(item):
        found = True
        break
if found:
    # do something if found...  </code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">if any(condition(item) for item in a_list):
    # do something if found...  </code></pre>
</div>

<div id="property" class="step" data-x="2500" data-y="1000">
  <h3>属性(property)</h3>
  <ul>
    <li>不推荐</li>
  </ul>
  <pre><code class="python">class Clock(object):
    def __init__(self):
        self.__hour = 1
    def setHour(self, hour):
        if 25 > hour > 0: self.__hour = hour
        else: raise BadHourException
    def getHour(self):
        return self.__hour</code></pre>
  <ul>
    <li>推荐</li>
  </ul>
  <pre><code class="python">class Clock(object):
    def __init__(self):
        self.__hour = 1
    def __setHour(self, hour):
        if 25 > hour > 0: self.__hour = hour
        else: raise BadHourException
    def __getHour(self):
        return self.__hour
    hour = property(__getHour, __setHour)</code></pre>
</div>

<div id="thanks" class="step" data-scale="5">
  <h1>谢谢 !</h1>
</div>

<div id="overview" class="step" data-scale="10"></div>
