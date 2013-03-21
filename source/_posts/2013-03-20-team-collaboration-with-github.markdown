---
layout: post
title: "使用GitHub进行团队合作"
date: 2013-03-20 23:04
comments: true
categories: [github]
---

[Team Collaboration With GitHub]: http://net.tutsplus.com/articles/general/team-collaboration-with-github/ "使用GitHub进行团队合作"
[GitHub]: http://github.com "GitHub"
[Git]: http://git-scm.com/ "git"
[Trello]: http://trello.com "Trello"
[Pivotal Tracker]: https://www.pivotaltracker.com/ "Pivotal Tracker"
[Travis CI]: https://travis-ci.org/ "Travis CI"
[Hubot]: http://hubot.github.com/ "Hubot"

*原文: [Team Collaboration With GitHub][]*

---

[GitHub][]已经成为的一切开放源码软件的基石。开发人员喜欢它，基于它进行协作，并不断通过它开发令人惊叹的项目。
除了​​代码托管，[GitHub][]的主要吸引力是使用它作为一个协作开发工具。在本教程中，让我们来看看一些最有用的GitHub的功能，
特别是使团队工作更有效率，更高生产力，非常重要的，好玩的那些功能！

---

# GitHub和软件合作 #

{% blockquote %}
有一件事我觉得非常有用的是，可以将GitHub的维基集成到项目的源代码主线上。
{% endblockquote %}
本教程假定您已经熟悉[Git][]: 开放源码的分布式版本控制系统，由Linux的创世人[Linus Torvalds](http://en.wikipedia.org/wiki/Linus_Torvalds)在2005年创造的。如果您需要修改或查找有关[Git][]，请访问我们以前的[截屏教程](https://tutsplus.com/course/git-essentials/)，和一些[文章](http://net.tutsplus.com/tag/git/)。
此外，你应该已经有一个[Github][]上的帐户，并做了一些基本的功能，如创建一个存储库，并推送到[GitHub][]上。如果没有，可以参照更多以前的教程(http://net.tutsplus.com/tag/github/)。

在这个世界上的软件项目，不可避免的是，我们必须和一个团队一起工作来交付软件。在本教程中，我们将探索一些软件开发团队最常用的工具。这些工具包括：

-   **添加团队成员** - 组织和合作者
-   **Pull请求** - 发送代码变更和合并
-   **问题跟踪** - Github上的错误记录
-   **分析** - 图形与网络
-   **项目管理** - [Trello][]与[Pivotal Tracker][]
-   **持续集成** - [Travis CI][]
-   **代码审查** - 代码行评论与URL查询
-   **记录** - Wiki与Hubot

# 更喜欢截屏操作视频？ #

如果你倾向于观看截屏操作视频，观看下面的截屏操作视频，将本教程作为旁注。

{% video http://tutsplus-media.s3.amazonaws.com/net.tutsplus.com/video/4-Team-Collaboration-With-GitHub.mp4 %}

# 工具一：增加团队成员 #

有两种常用的方法在[GitHub][]上建立团队合作：

- **组织** - 组织的所有者可以针对不同的代码仓库建立不同访问权限的团队。
- **合作者** - 代码仓库的所有者可以为单个仓库增加具备只读或者读写权限的协作者。

## 组织 ##

如果您监管几个团队，想为每个团队设置不同的权限级别，或者为不同的代码仓库增加不同的成员
组织(Organizations)将是最好的选择。任何GitHub用户帐户已经可以创建免费的开源代码库的组织。
要创建一个组织，只需浏览您的[组织设置页面](https://github.com/settings/organizations)：

{% img http://cdn.tutsplus.com/net.tutsplus.com/authors/sayanee-basu/github-team-create-org.png %}

要访问组织的团队页面，你可以简单地去
`http://github.com/organizations/[组织名称]/teams`来查看，
或者访问`https://github.com/organizations/[组织名称]/teams/new`来创建新的具备3种不同的权限级别的团队成员，如：
1. Pull Only：[提取和合并](http://www.kernel.org/pub/software/scm/git/docs/git-pull.html)另一个库或本地副本。只读访问权限。
2. Push和Pull：(1)以及[更新](http://www.kernel.org/pub/software/scm/git/docs/git-push.html)远程代码仓库。读+写访问权限。
3. Pull, Push和管理：(1), (2)，计费，建立团队，以及取消组织帐户。读+写+管理员权限

{% img http://cdn.tutsplus.com/net.tutsplus.com/authors/sayanee-basu/github-team-create-team.png %}

## 合作者 ##

**合作者**主要用于读写访问个人账号所拥有的代码仓库。你可以通过`https://github.com/[用户名]/[代码仓库名称]/settings/collaboration`
来增加[合作者](https://help.github.com/articles/how-do-i-add-a-collaborator)(其他github个人账号)。

{% img http://cdn.tutsplus.com/net.tutsplus.com/authors/sayanee-basu/github-team-collaborator.png %}

一旦做到这一点，每个合作者将会看到代码库页面的访问状态的变化。在拥有对代码库的写访问权限后，我们可以做一个git克隆，
进行代码变更，用git拉取和归并远程存储库中的任何变化，并最终将本地的变化git推送到远程代码库：

{% img http://cdn.tutsplus.com/net.tutsplus.com/authors/sayanee-basu/github-team-access.png %}

# 工具二：Pull请求 #

[Pull请求](https://help.github.com/articles/using-pull-requests)是一个非常棒的方式，
通过fork一个新的代码库用来独立开发，并将变更贡献回原始代码库。在一天结束的时候，如果我们愿意，
我们可以发送一个pull请求给代码库所有者，来合并我们的代码更改。Pull请求本身可以引起合作者之间的评论，
包括代码质量，功能，甚至总体战略等。

现在让我们浏览一个[pull请求](https://help.github.com/articles/using-pull-requests)的基本步骤。

## 发起一个Pull请求 ##

GitHub有两种Pull请求方式：

1. Fork & Pull 方式 - 用于在公共库中，我们没有推送(push)权限。
2. 共享库方式 - 用于私有代码仓库，我们有推送(push)权限。这种情况下没有必要进行fork。

下面的工作流程是在两个用户(原始代码库拥有者，和fork代码库拥有者)之间的fork-pull方式：

1.  进入你想贡献修改的GitHub代码库，单击“Fork”按​​钮来创建自己的Github帐户上的代码库克隆：

    {% img http://cdn.tutsplus.com/net.tutsplus.com/authors/sayanee-basu/github-team-fork.png%}

2.  这将在自己的帐户上创建一个该代码库的复制：

    {% img http://cdn.tutsplus.com/net.tutsplus.com/authors/sayanee-basu/github-team-forked.png %}

3.  [选择 SSH URL](https://help.github.com/articles/why-is-git-always-asking-for-my-password),
    那样它会自动使用你自己的SSH密钥，而不用每次在git pull或者push时询问你的用户名和密码。
    下一步，我们将克隆一份代码库到本地计算机：

    ```bash
    $ git clone [ssh-url] [folder-name]
    $ cd [folder-name]
    ````

4.  一般情况下，每一个新的功能，我们将创建一个新的Git分支。这是一个很好的做法，因为在未来，
    如果经过一番讨论后我们需要进一步更新分支，[Pull请求将被自动更新](http://stackoverflow.com/questions/9790448/how-to-update-a-pull-request)。
    让我们创建一个新的分支做一个非常简单的变化修改的readme.md文件：

    ```bash
    $ git checkout -b [new-feature]
    ```

5.  在为这个新功能增加文件后，我们只需要将修改提交到这个新分支上，然后切换回master分支:

    ```bash
    $ git add .
    $ git commit -m "information added in readme"
    $ git checkout master
    ```

6.  在这里，我们需要将新分支推送到远程代码仓库里。首先，我们需要检查这个新功能的分支名称以及其在远程仓库的别名，
    然后我们用`git push [git-remote-alias] [branch-name]`推送这个变更。

    ```bash
    $ git branch
    * master
    readme
    $ git remote -v
    origin  git@github.com:[forked-repo-owner-username]/[repo-name].git (fetch)
    origin  git@github.com:[forked-repo-owner-username]/[repo-name].git (push)
    $ git push origin readme
    ```

7.  进入我们fork的代码库的GitHub页面，选择为这个新功能建立的分支，然后点击`Pull Request`按钮：

    {% img http://cdn.tutsplus.com/net.tutsplus.com/authors/sayanee-basu/github-team-pull-request.png %}

8.  提交Pull请求后，页面将直接跳转到原始库的Pull请求页面，我们将看到我们提交的Pull请求，作为一个新的问题，以及作为一个新的pull请求。

    {% img http://cdn.tutsplus.com/net.tutsplus.com/authors/sayanee-basu/github-team-pull-request-sent.png %}

9.  在经过讨论后，fork的代码库的作者可能想为这个新功能增加一些新的改动。在这种场景下，我们需要在本地计算机上checkout这个同样的分支，
    修改，并
