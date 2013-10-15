---
layout: post
title: "Android uiautomator的python包"
date: 2013-08-26 17:59
comments: true
categories: [python, uiautomator, android]
---

随着Android的快速演进，先后经历了 Android 测试框架从 InstrumentationTest, Robotium, Monkeyrunner, 直到 uiautomator 的变化，从目前来看，对于独立的QA团队来说，uiautomator 是最适合的 Android 测试框架.

就我个人的体会，沉重的 Java 语言及其繁琐的工具链，是阻碍 uiautomator 推广的障碍，个人更喜欢 Python 和 Javascript 的快速开发和方便的工具链。为了更方便地利用 uiautomator，花了两周时间实现了 Android uiautomator 的 Python Wrapper 模块并开源出来：

- [pypi: uiautomator](https://pypi.python.org/pypi/uiautomator)
- [uiautomator.py slides](/slides/android-uiautomator-and-python/)
- [github source code](https://github.com/xiaocong/uiautomator)

希望下一步能有时间完成相应的 nodejs 模块。

