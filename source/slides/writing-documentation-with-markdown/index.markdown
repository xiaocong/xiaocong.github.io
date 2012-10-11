---
layout: impress
title: "使用markdown书写文档"
date: 2012-10-10 15:36
---

<div id="markdown-index" class="step" >
  <p class="substep">用Markdown写</p>
  <h1>程序员的文档</h1>
  <p class="footer">
    <a href="http://daringfireball.net/projects/markdown/">markdown</a> ·
    <span>Oct 2012</span> ·
    <span>He, Xiaocong</span>
  </p>
</div>

<div id="markdown-index" class="step" data-y="-2000" data-z="1000" data-scale="2">
  <h2>有没有在写技术文档的时候遇到这样的问题?</h2>
</div>

<div id="issue-1" class="step" data-y="-1500" data-z="1000" data-rotate="90">
  <blockquote>你写的文档用MS Office打开时格式乱了! 下次发出来前一定用MS Office调整一下.</blockquote>
</div>

<div id="issue-2" class="step" data-y="-1000" data-z="1000" data-rotate="180">
  <blockquote>这个文档和上一个版本到底修改了什么地方啊!? 看Revision history?</blockquote>
</div>

<div id="issue-3" class="step" data-y="-500" data-z="1000" data-rotate="270">
  <blockquote>嗯...? 我也忘了具体改哪儿了, 咱们一行一行对比一遍吧!</blockquote>
</div>

<div id="issue-4" class="step" data-y="0" data-z="1000" data-rotate="360">
  <blockquote>我花了一晚上把文档格式修正了一下. 什么? 你也改了? 这word文档怎么合并?! 我的改动少, 我在你的版本上再修改一次吧!</blockquote>
</div>

<div id="issue-5" class="step" data-y="500" data-z="1000" data-rotate="450">
  <blockquote>这该死的Open Office, 这么难用!?</blockquote>
</div>

<div id="issue-6" class="step" data-y="1000" data-z="1000" data-rotate="540">
  <blockquote>什么?! 我修改的文档有病毒?!</blockquote>
</div>

<div id="issue-7" class="step" data-y="1500" data-z="1000" data-rotate="600">
  <blockquote>你得申请文档库的权限. 咱们的代码库不让放大量的二进制文件, 所以...... 我给你发邮件告诉你文档的路径.</blockquote>
</div>

<div id="issue-8" class="step" data-y="2000" data-z="1000" data-rotate="660">
  <blockquote>对, 我们的代码分了三条线. 设计文档? 文档只有一条线. 这三条线的区别不大, 不会audit这么严格吧?!</blockquote>
</div>

<div id="question" class="step" data-x="-1000" data-y="1000" data-scale="2">
  <h2>如何解决???!!!</h2>
</div>

<div id="requirement" class="step" data-x="-500" data-y="500" data-rotate-z="90">
  <h3>要求</h3>
  <p/>
  <p class="substep">容易书写</p>
  <p class="substep">容易阅读</p>
  <p class="substep">Windows, Linux, Mac都能进行阅读和修改</p>
  <p class="substep">可以diff和打patch, 方便进行版本管理</p>
  <p class="substep">能和代码放在同一个版本库中</p>
  <p class="substep">可以转换成html/pdf/doc等通用格式</p>
  <p class="substep">简单易学</p>
</div>

<div id="answer-markdown" class="step" data-rotate-z="180" data-scale="0.5">
  <h1>推荐: Markdown</h1>
</div>

<div id="markdown-why" class="step" data-x="500" data-y="-500" data-rotate-z="360" data-scale="0.25">
  <h3>Markdown设计的目标:</h3><p/>
  <blockquote>易读易写的适用于网络的文本书写语言</blockquote>
</div>

<div id="markdown-syntax" class="step" data-x="-2000" data-y="-2000">
  <h2>Markdown支持的语法</h2>
</div>

<div id="markdown-head" class="step" data-x="-1000" data-y="-2000">
  <h3>标题</h3>
  <pre><code class="markdown">
# 这是H1

## 这是H2

### 这是H3

###### 这是H6
  </code></pre>
</div>

<div id="markdown-paragraph" class="step" data-x="0" data-y="-2000">
  <h3>段落</h3>
  <pre><code class="markdown">
这是段落1。
这还是段落1的内容，换行并不表示新起一段。

这是段落2，因为上一行是空行，空行意味着新起一段。
  </code></pre>
</div>

<div id="markdown-blockquote-1" class="step" data-x="1000" data-y="-2000">
  <h3>区块引用</h3>
  <pre><code class="markdown">
> 这是一个含有两个段落的区块引用。区间引用必须以`>`+空格开始。
> 这是区块引用的第一个段落，因为中间没空行。
>
> 这是区块引用的第二个段落，因为上一行是空行。
  </code></pre>
</div>

<div id="markdown-blockquote-2" class="step" data-x="2000" data-y="-2000">
  <h3>区块引用</h3>
  <p class="substep">区块引用的段落</p>
  <pre><code class="markdown">
> Markdown也允许你偷懒只在整个段落的第一行最前面加上`>`
同一段落的其他行可以没有`>`。

> 这是区块引用的第二个段落，因为上一行是空行。
  </code></pre>
</div>

<div id="markdown-blockquote-3" class="step" data-x="-2000" data-y="-1000">
  <h3>区块引用</h3>
  <p class="substep">区块引用可以嵌套</p>
  <pre><code class="markdown">
> 区块引用可以嵌套
>
> > 这是嵌套的区块引用
>
> 返回到第一层区块引用
  </code></pre>
</div>

<div id="markdown-blockquote-4" class="step" data-x="-1000" data-y="-1000">
  <h3>区块引用</h3>
  <p class="substep">引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等</p>
  <pre><code class="markdown">
> ## 这是一个标题。
> 
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     return shell_exec("echo $input | $markdown_script");  </code></pre>
  </code></pre>
</div>

<div id="markdown-list-1" class="step" data-x="0" data-y="-1000">
  <h3>列表</h3>
  <p class="substep">`*`加上1-3个空格开头</p>
  <pre><code class="markdown">
* Red
* Green
* Blue
  </code></pre>
  <p class="substep">或者, `-`也行</p>
  <pre><code class="markdown">
- Red
- Green
- Blue
  </code></pre>
</div>

<div id="markdown-list-2" class="step" data-x="1000" data-y="-1000">
  <h3>列表</h3>
  <p class="substep">或者, `+`也行</p>
  <pre><code class="markdown">
+ Red
+ Green
+ Blue
  </code></pre>
  <p class="substep">或者, 有序数字后面需要加上句点</p>
  <pre><code class="markdown">
1. Red
2. Green
3. Blue
  </code></pre>
</div>

<div id="markdown-list-3" class="step" data-x="2000" data-y="-1000">
  <h3>列表</h3>
  <p class="substep">可以缩进，写得好看点</p>
  <pre><code class="markdown">
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
  </code></pre>
</div>

<div id="markdown-list-4" class="step" data-x="-2000" data-y="0">
  <h3>列表</h3>
  <p class="substep">当然，如果你懒，下面也行...</p>
  <pre><code class="markdown">
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.
  </code></pre>
</div>

<div id="markdown-list-5" class="step" data-x="-1000" data-y="0">
  <h3>列表</h3>
  <p class="substep">列表项目可以包含多个段落，每个项目下的段落都必须缩进 4 个空格或是 1 个制表符</p>
  <pre><code class="markdown">
1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.
  </code></pre>
</div>

<div id="markdown-list-6" class="step" data-x="0" data-y="0">
  <h3>列表</h3>
  <p class="substep">当然，再次地，如果你很懒惰，Markdown 也允许首行缩进...</p>
  <pre><code class="markdown">
*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.
  </code></pre>
</div>

<div id="markdown-list-7" class="step" data-x="1000" data-y="0">
  <h3>列表</h3>
  <p class="substep">列表里可以放进引用，那`>`需要缩进</p>
  <pre><code class="markdown">
*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.
  </code></pre>
</div>

<div id="markdown-list-8" class="step" data-x="2000" data-y="0">
  <h3>列表</h3>
  <p class="substep">列表里可以放进代码，代码需要缩进2次，也就是8个空格或者2个制表符</p>
  <pre><code class="markdown">
*   一列表项包含一个列表区块：

        <两次缩进后，代码写在这>
  </code></pre>
</div>

<div id="markdown-code-1" class="step" data-x="-2000" data-y="1000">
  <h3>代码区块</h3>
  <p class="substep">缩进4个空格或是1个制表符的段落是代码区块</p>
  <pre><code class="markdown">
这是一个普通段落：

    这是一个代码区块。
  </code></pre>
  <p class="substep">一个代码区块会一直持续到没有缩进的那一行（或是文件结尾）</p>
</div>

<div id="markdown-divide" class="step" data-x="-1000" data-y="1000">
  <h3>分割线</h3>
  <p class="substep">可以用三个以上的星号、减号、底线组成的单独行来建立分割线，星号或者减号中间可以加空格</p>
  <pre><code class="markdown">
* * *

***

*****

- - -

---------------------------------------
  </code></pre>
</div>

<div id="markdown-link-1" class="step" data-x="0" data-y="1000">
  <h3>链接</h3>
  <p class="substep">链接文字都是用 [方括号] 来标记</p>
  <pre><code class="markdown">
This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.
  </code></pre>
</div>

<div id="markdown-link-2" class="step" data-x="1000" data-y="1000">
  <h3>链接</h3>
  <p class="substep">可以用<b>相对路径</b>相同主机的资源</p>
  <pre><code class="markdown">
See my [About](/about/) page for details.
  </code></pre>
</div>

<div id="markdown-link-3" class="step" data-x="2000" data-y="1000">
  <h3>链接</h3>
  <p class="substep">可以在文件的任意地方预先定义参考式的链接, 预定义的链接不会生成页面内容</p>
  <pre><code class="markdown">
[id]: http://example.com/  "Optional Title Here"
[Android]: http://www.android.com/  "Google Android"
  </code></pre>
  <p class="substep">[] 内的字串是这个链接的id，可以含空格.</p>
</div>

<div id="markdown-link-4" class="step" data-x="-2000" data-y="2000">
  <h3>链接</h3>
  <p class="substep">在其他地方就可以直接通过 id 引用这个链接了</p>
  <pre><code class="markdown">
This is [an example][id] reference-style link.
  </code></pre>
  <p class="substep">或者, 如果这个 id 就是你想显示的文字</p>
  <pre><code class="markdown">
[Android][] 4.1, Jelly Bean, is the fastest and smoothest 
version of [Android][] yet.
  </code></pre>
</div>

<div id="markdown-emphasis-1" class="step" data-x="-1000" data-y="2000">
  <h3>强调</h3>
  <p class="substep">Markdown 使用星号（*）和底线（_）作为标记强调字词的符号</p>
  <pre><code class="markdown">
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
  </code></pre>
  <p class="substep">单个字符表示强调(em)，双字符表示加强(strong)</p>
</div>

<div id="markdown-codespan-1" class="step" data-x="0" data-y="2000">
  <h3>内嵌代码</h3>
  <p class="substep">如果要标记一小段行内代码，可以用反引号把它包起来（`）</p>
  <pre><code class="markdown">
Use the `printf()` function.
  </code></pre>
  <p class="substep">如果要在代码区段内插入反引号，你可以用多个反引号来开启和结束代码区段</p>
  <pre><code class="markdown">
A span of code: `` There is a literal backtick (`) here. ``
  </code></pre>
</div>

<div id="markdown-codespan-2" class="step" data-x="1000" data-y="2000">
  <h3>内嵌代码</h3>
  <p class="substep">在代码区段内，& 和方括号都会被自动地转成 HTML 实体，这使得插入 HTML 原始码变得很容易</p>
  <pre><code class="markdown">
Please don't use any `&lt;blink&gt;` tags.
  </code></pre>
</div>

<div id="markdown-image-1" class="step" data-x="2000" data-y="2000">
  <h3>图片</h3>
  <p class="substep">可以直接插入行内图片</p>
  <pre><code class="markdown">
![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")
  </code></pre>
  <p class="substep">在链接的语法前面加上感叹号 (!) 表明是图片链接</p>
</div>

<div id="markdown-image-2" class="step" data-x="-2000" data-y="3000">
  <h3>图片</h3>
  <p class="substep">也可以使用参考式图片</p>
  <pre><code class="markdown">
![Alt text][id]

[id]: url/to/image  "Optional title attribute"
  </code></pre>
</div>

<div id="markdown-html" class="step" data-x="-1000" data-y="3000">
  <h3>HTML</h3>
  <p class="substep">当遇到markdown不能表达的格式时，可以直接写HTML语法</p>
  <pre><code class="markdown">
&lt;img src="url" alt="Alt text" width="50" height="50"&gt;&lt;/img&gt;
  </code></pre>
</div>

<div id="markdown-thinking" class="step" data-x="2000" data-y="2000" data-rotate-z="180">
  <h2>对 Markdown 感觉如何?</h2>
</div>

<div id="markdown-conclusion" class="step" data-scale="2">
  <h2>「易读易写」</h2>
</div>

<div id="markdown-how-to-publish" class="step" data-x="1000" data-y="1000" data-rotate="90" data-x="-1000">
  <h2>如何发布 Markdown 写的文档 ?</h2>
  <p class="substep">
    <ul>
      <li>HTML</li>
      <li>PDF</li>
      <li>或者其他...</li>
    </ul>
  </p>
</div>

<div id="markdown-edit-tool" class="step" data-x="500" data-y="500" data-rotate="90" data-x="1000">
  <h2>Markdown 编辑器</h2>
  <ul>
    <li>Windows: MarkdownPad(http://markdownpad.com/)</li>
    <li>Mac: Mou(http://mouapp.com/)</li>
    <li>Others: Vim/Emacs/Sublime Text/......</li>
    <li>Eclipse Plugin: http://www.winterwell.com/software/markdown-editor.php</li>
  </ul>
</div>

<div id="markdown-impl" class="step" data-x="-500" data-y="-500" data-rotate="-90" data-scale="2">
  <h2>Markdown 实现</h2>
  <p class="substep">http://en.wikipedia.org/wiki/List_of_Markdown_implementations</p>
</div>

<div id="markdown-ref" class="step" data-x="-1000" data-y="-1000" data-rotate="-180" data-scale="2">
  <h2>参考网站</h2>
  <p class="substep">http://wowubuntu.com/markdown/</p>
  <p class="substep">http://daringfireball.net/projects/markdown/</p>
</div>

<div id="thanks" class="step" data-scale="10">
  <h1>谢谢 !</h1>
</div>

<div id="overview" class="step" data-scale="10"></div>
