---
layout: post
title: "在Ubuntu下配置舒服的Python开发环境"
date: 2013-06-18 14:37
comments: true
categories: [python]
---

Ubuntu 提供了一个良好的 Python 开发环境，但如果想使我们的开发效率最大
化，还需要进行很多定制化的安装和配置。下面的是我们团队开发人员推荐的一
个安装和配置步骤，基于 Ubuntu 12.04 桌面版本标准安装。

## 安装 Python 发布版本和 build 依赖包

建议至少安装 Python 2.7/3.2 版本，毕竟 Python 2.X/3.X 还是有不少区别的。

{% codeblock lang:bash %}
# 安装 Python 发布版本，dev包必须安装，很多用pip安装包都需要编译
sudo apt-get install python2.7 python2.7-dev python3.2 python3.2-dev
# 很多pip安装的包都需要libssl和libevent编译环境
sudo apt-get install build-essential libssl-dev libevent-dev libjpeg-dev libxml2-dev libxslt-dev
{% endcodeblock %}

## 安装 pip 和 virtualenv

`pip` 是 Python 的包管理工具，建议 Python 的包都用 pip 进行管理。
`virtualenv`是 Python 多版本管理的利器，不同版本的开发调试全靠它了。

{% codeblock lang:bash %}
# 安装 pip
sudo apt-get install python-pip
# 安装 virtualenv
sudo pip install virtualenv
{% endcodeblock %}

## 配置个人用 virtualenv

尽量在 virtualenv 下进行 Python 包的安装。

{% codeblock lang:bash %}
# 安装 python2.7 virtualenv
virtualenv --no-site-packages -p /usr/bin/python2.7 ~/.venv/python2.7

# 安装 python3.2 virtualenv
virtualenv --no-site-packages -p /usr/bin/python3.2 ~/.venv/python3.2
{% endcodeblock %}

然后将下面的代码增加到`~/.bashrc`的最后面，缺省使用 virtualenv 来代替
系统 Python 环境：

{% codeblock lang:bash %}
# 缺省激活python2.7环境
if [ -f ~/.venv/python2.7/bin/activate ]; then
    . ~/.venv/python2.7/bin/activate
fi
{% endcodeblock %}

## 安装 git 和 gitflow

`git`是使用 github 必备，目前最好的版本管理工具。

{% codeblock lang:bash %}
$ sudo apt-get install git
{% endcodeblock %}

配置 git：

{% codeblock lang:bash %}
# 常用的命令都设置alias，尽量少敲键盘
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.co checkout
git config --global alias.st status
# 很好看地显示git log
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen (%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --"
# 设置用户信息
git config --global user.name "Your Name"
git config --global user.email you@email.com
# 缺省使用颜色显示
git config --global color.ui true
{% endcodeblock %}

安装 `git-flow`，使用标准化 git 分支流程，参见：

- [使用 Git Flow](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/)
- [一个成功的 Git 分支模型](http://nvie.com/posts/a-successful-git-branching-model/)

{% codeblock lang:bash %}
sudo apt-get install git-flow
{% endcodeblock %}

## 安装 bash-it

`bash-it`可以美化你的 bash 环境，让你更高效地使用控制台终端，详细信息参
见[bash-it github 网站](https://github.com/revans/bash-it)

{% codeblock lang:bash %}
git clone http://github.com/revans/bash-it.git ~/.bash_it
~/.bash_it/install.sh
{% endcodeblock %}

安装的时候可以选择所有的 alias/plugins/completion，如果自定义选择，
一定将`virtualenv`, `git`插件选择上。

安装完成后将下面的代码附加到`~/.bashrc`的后面：

{% codeblock lang:bash %}
if [ -f ~/.bash_profile ]; then
    . ~/.bash_profile
fi
{% endcodeblock %}

`bash-it`安装完成后缺省使用 bobby 样式(可以参见`~/.bash_profile`里定义
的环境变量`BASH_IT_THEME`)，编辑
`~/.bash_it/themes/bobby/bobby.theme.bash`，在`PS1`的定义里增加
`${green}$(virtualenv_prompt)`，如下：

{% codeblock lang:bash %}
PS1="\n${yellow}$(ruby_version_prompt)${green}$(virtualenv_prompt) ${purple}\h ${reset_color}in ${green}\w\n${bold_cyan}$(scm_char)${green}$(scm_prompt_info) ${green}→${reset_color} "
{% endcodeblock %}

注：样式定义参加文件`~/.bash_profile`里定义的环境变量`BASH_IT_THEME`，
你也将其值更改成其他`~/.bash_it/themes`里定义的样式。

最后重启终端，你将看到一个不一样的`bash`，支持显示`git`分支，
`virtualenv`，`rvm`等。

## 安装 Sublime Text 2

在浏览器进入 [Sublime Text 2 官网](http://www.sublimetext.com/2)，
选择适合的版本下载安装。

安装完成后还需要安装`Sublime Text 2`的`Package Control`。安装细节参见
[Sublime Packages 安装](http://wbond.net/sublime_packages/package_control/installation)。

最后，按快捷键`Ctrl+Shift+P`调出命令窗口，选择`Package Control: Install Package`，安装 Python 开发常用的插件：

- Auto Encoding for Python
- BracketHighlighter
- Git
- Markdown Preview
- Python Auto-Complete
- SublimeLinter
- SidebarEnhancements
- SublimeCondeIntel
- sublime-github
- Dayle Rees Color Schemes

这里推荐一下插件 sublime-github，能在 Sublime 里查看，增加，修改
[GitHub Gist](https://gist.github.com)。如果你和团队都使用 Github Gist 来存储自己常用的代
码片段，这将非常方便大家去迅速查找和共享解决常见问题的代码片段。

-   首先进入[github](https://github.com/settings/applications) 新建一个
    个人 API 访问 token；
-   运行 Sublime，选择菜单`Preferences`->`Package
    Settings`->`GitHub`->`Settings-Default`，将上面生成的`token`复制到
    `github_token`字段，保存。

之后你就可以按快捷键`Ctrl+Shift+P`，选择`GitHub: Open Gist in Editor`，
然后选择你自己的 Gist 即可。

## 安装并配置 Vim

有了 Sublime Text，大部分情况下都不需要 Vi 了，但的确有些时候进行很小
的改动还是用 Vi 最方便。Ubuntu的缺省安装应当已经包括了 Vim，如果没有，运行下面命令安装 Vim。

{% codeblock lang:bash %}
sudo apt-get install vim
{% endcodeblock %}

然后，参考[Amix's Vimrc](https://github.com/amix/vimrc)来配置 Vim。

---

至此，所有的基本环境就已经配备完成，希望这些配置能对大家有所帮助，下面是配置好的界面截屏。

{% img /images/post/bash.png %}

{% img /images/post/sublime.png %}

