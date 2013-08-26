---
layout: post
title: "Android uiautomator的python包"
date: 2013-08-26 17:59
comments: true
categories: [python, uiautomator, android]
---

随着Android的快速演进，先后经历了Android测试框架从InstrumentationTest, Robotium, Monkeyrunner, 直到 uiautomator 的变化，从目前来看，对于独立的QA团队来说，uiautomator是最适合的Android测试框架.

就我个人的体会，沉重的Java语言及其繁琐的工具链，是阻碍uiautomator推广的障碍，个人更喜欢Python和Javascript的快速开发和方便的工具链。
为了更方便地利用uiautomator，花了两周时间实现了Android uiautomator的Python Wrapper模块并开源出来：

- [pypi: uiautomator](https://pypi.python.org/pypi/uiautomator)
- [uiautomator.py slides](/slides/android-uiautomator-and-python/)
- [github source code](https://github.com/xiaocong/uiautomator)

希望下一步能有时间完成相应的nodejs模块。

