---
layout: post
title: "在 Markdown 中嵌入 UML 文档"
date: 2013-04-22 13:23
comments: true
categories: [markdown, uml]
---

[Markdown]: http://daringfireball.net/projects/markdown/ "Markdown"
[YUML]: http://yuml.me/

[Markdown][]是网络书写语言，特别适合程序员书写文档：

-   全文本格式，方便进行`diff`，`patch`和版本的管理；
-   格式直观，简单易学，便于书写和阅读；
-   兼容 HTML，能方便地转换为 pdf，doc等格式；
-   支持 Linux，Windows，Mac；
-   支持内嵌代码和语法高亮；

估计只是方便版本管理，就能吸引很多程序员的兴趣，特别是需要团队一起参与书写文档的时候。
感兴趣的可以参考官方网站，或者以前写的一份[使用 Markdown 的 slides](/slides/writing-documentation-with-markdown/)。

但是毕竟[Markdown][]只是书写语言，不是程序设计语言，如果我们需要嵌入 UML 的时候，不可避免地需要其他专业软件的支持。
这里介绍几种利用网络服务，可以直接在[Markdown][]文档中嵌入的 UML 建模图：

<!--more-->
---

## 用例图

- 角色(Actor)

    使用`[角色名]`表示角色。

        <img src="http://yuml.me/diagram/scruffy/usecase/[Customer]" >

    <img src="http://yuml.me/diagram/scruffy/usecase/[Customer]" >

- 用例(Use Case)

    使用`(用例名)`表示用例，`-`表示角色和用例之间的关联。

        <img src="http://yuml.me/diagram/scruffy/usecase/[Customer]-(Login),[Customer]-(Logout)" >

    <img src="http://yuml.me/diagram/scruffy/usecase/[Customer]-(Login),[Customer]-(Logout)" >

- 备注(Notes)

    如果用例名以`note:`开头，表明那是一个备注，可以用`{bg:颜色名}`定义备注的背景色。

        <img src="http://yuml.me/diagram/scruffy/usecase/[Customer]-(Login), [Customer]-(note: Cust can be registered or not{bg:beige})" >

    <img src="http://yuml.me/diagram/scruffy/usecase/[Customer]-(Login), [Customer]-(note: Cust can be registered or not{bg:beige})" >

- 角色继承(Actor Inheritance)

    使用符号`^`表示角色之间的继承关系。

        <img src="http://yuml.me/diagram/scruffy/usecase/[Cms Admin]^[User], [Customer]^[User], [Agent]^[User]" >

    <img src="http://yuml.me/diagram/scruffy/usecase/[Cms Admin]^[User], [Customer]^[User], [Agent]^[User]" >

- 扩展和包含(Extends and Includes)

    使用`>`表示用例之间的包含关系，`<`表示用例的扩展。

        <img src="http://yuml.me/diagram/scruffy/usecase/(Login)<(Register),(Login)<(Request Password Reminder),(Register)>(Confirm Registration)" >

    <img src="http://yuml.me/diagram/scruffy/usecase/(Login)%3C(Register),(Login)%3C(Request%20Password%20Reminder),(Register)%3E(Confirm%20Registration)" >

- 完整示例

        <img src="http://yuml.me/diagram/nofunky/usecase/(note: figure 1.2{bg:beige}), [User]-(Login),[Site Maintainer]-(Add User),(Add User)<(Add Company),[Site Maintainer]-(Upload Docs),(Upload Docs)<(Manage Folders),[User]-(Upload Docs), [User]-(Full Text Search Docs), (Full Text Search Docs)>(Preview Doc),(Full Text Search Docs)>(Download Docs), [User]-(Browse Docs), (Browse Docs)>(Preview Doc), (Download Docs), [Site Maintainer]-(Post New Event To The Web Site), [User]-(View Events)" >
        
    <img src="http://yuml.me/diagram/nofunky/usecase/(note:%20figure%201.2%7Bbg:beige%7D),%20[User]-(Login),[Site%20Maintainer]-(Add%20User),(Add%20User)%3C(Add%20Company),[Site%20Maintainer]-(Upload%20Docs),(Upload%20Docs)%3C(Manage%20Folders),[User]-(Upload%20Docs),%20[User]-(Full%20Text%20Search%20Docs),%20(Full%20Text%20Search%20Docs)%3E(Preview%20Doc),(Full%20Text%20Search%20Docs)%3E(Download%20Docs),%20[User]-(Browse%20Docs),%20(Browse%20Docs)%3E(Preview%20Doc),%20(Download%20Docs),%20[Site%20Maintainer]-(Post%20New%20Event%20To%20The%20Web%20Site),%20[User]-(View%20Events)" >

[YUML][]支持3种图示风格，分别是：

- plain
- scruffy
- boring

你可以对比下列图示的不同风格：

<img src="http://yuml.me/diagram/plain/usecase/[Customer]-(Login),[Customer]-(Logout),(login)<(Register)" >
<img src="http://yuml.me/diagram/scruffy/usecase/[Customer]-(Login),[Customer]-(Logout),(login)<(Register)" >
<img src="http://yuml.me/diagram/boring/usecase/[Customer]-(Login),[Customer]-(Logout),(login)<(Register)" >

## 活动图

- 动作(Action)

    用`(状态名)`表示一个状态，其中`(start)`和`(end)`分别表示开始状态和结束状态，箭头`->`表示状态的转换。

        <img src="http://yuml.me/diagram/nofunky/activity/(start)->(Boil Kettle)->(end)" >

    <img src="http://yuml.me/diagram/nofunky/activity/(start)-%3E(Boil%20Kettle)-%3E(end)" >

- 判断和限制(Decisions and Constraints)

    使用`<判断名>`表示一个条件判断，其后跟`[条件]->`表示满足条件后状态的转换；用不同的`判断名`来标识不同的判定位置。
    
        <img src="http://yuml.me/diagram/nofunky/activity/(start)-><a>[kettle empty]->(Fill Kettle)->(Boil Kettle),<a>[kettle full]->(Boil Kettle)->(end)" >
        
    <img src="http://yuml.me/diagram/nofunky/activity/(start)-%3E%3Ca%3E[kettle%20empty]-%3E(Fill%20Kettle)-%3E(Boil%20Kettle),%3Ca%3E[kettle%20full]-%3E(Boil%20Kettle)-%3E(end)" >
    
- 分支合并(Fork/Join)

    使用`||`表示分支或者合并点。

        <img src="http://yuml.me/diagram/nofunky/activity/(start)-><a>[kettle empty]->(Fill Kettle)->|b|,<a>[kettle full]->|b|->(Boil Kettle)->|c|,|b|->(Add Tea Bag)->(Add Milk)->|c|->(Pour Water)->(end),(Pour Water)->(end)" >
        
    <img src="http://yuml.me/diagram/nofunky/activity/(start)-%3E%3Ca%3E[kettle%20empty]-%3E(Fill%20Kettle)-%3E%7Cb%7C,%3Ca%3E[kettle%20full]-%3E%7Cb%7C-%3E(Boil%20Kettle)-%3E%7Cc%7C,%7Cb%7C-%3E(Add%20Tea%20Bag)-%3E(Add%20Milk)-%3E%7Cc%7C-%3E(Pour%20Water)-%3E(end),(Pour%20Water)-%3E(end)" >
    
- 对象(Objects)

    符号`[]`表示一个对象。
    
        <img src="http://yuml.me/diagram/nofunky/activity/(start)->[Water]->(Fill Kettle)->(end)" >
        
    <img src="http://yuml.me/diagram/nofunky/activity/(start)-%3E[Water]-%3E(Fill%20Kettle)-%3E(end)" >

- 连接器名称(Connector Name)

    在`->`中加入名称，`-名称>`表示命名连接器。

        <img src="http://yuml.me/diagram/nofunky/activity/(start)-fill>(Fill Kettle)->(end)" >
        
    <img src="http://yuml.me/diagram/nofunky/activity/(start)-fill%3E(Fill%20Kettle)-%3E(end)" >

## 类图

- 关联(Association)

    类名用`[]`表示，`->`表示定向关联，`-`表明关联。

        <img src="http://yuml.me/diagram/nofunky/class/[Customer]->[Billing Address]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[Customer]-%3E[Billing%20Address]" >

- 基数(Cardinality)

    `基数-基数>`表明关联的基数，其中基数可以为`0`，`1`，`0..*`，`*`等任意定义的值。
    
        <img src="http://yuml.me/diagram/nofunky/class/[Customer]1-0..*[Address]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[Customer]1-0..*[Address]" >
    
- 定向关联(Directional Association)

    定向关联`->`可以定义名称：`-名称>`。

        <img src="http://yuml.me/diagram/nofunky/class/[Order]-billing >[Address], [Order]-shipping >[Address]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[Order]-billing%20%3E[Address],%20[Order]-shipping%20%3E[Address]" >
    
- 颜色和UTF8字符(Splash of Colour And UTF-8)

    类图可以用`{bg:颜色名}`定义显示的背景颜色。

        <img src="http://yuml.me/diagram/nofunky/class/[❝Customer❞{bg:orange}]❶- ☂>[Order{bg:green}]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[%E2%9D%9DCustomer%E2%9D%9E%7Bbg:orange%7D]%E2%9D%B6-%20%E2%98%82%3E[Order%7Bbg:green%7D]" >
    
- 聚合(Aggregation)

    聚合表示比关联更强的关联关系，使用`<>->`或者`+->`来表示。

        <img src="http://yuml.me/diagram/nofunky/class/[Company]<>-1>[Location], [Location]+->[Point]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[Company]%3C%3E-1%3E[Location],%20[Location]+-%3E[Point]" >

- 组成(Composition)

    组成表示比聚合更强的关联关系，使用`++->`来表示。

        <img src="http://yuml.me/diagram/nofunky/class/[Company]++-1>[Location]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[Company]++-1%3E[Location]" >
    
- 备注(Notes)

    使用`[note:注解内容]`表示备注，同样备注可以自定义颜色`{bg:颜色名}`。

        <img src="http://yuml.me/diagram/nofunky/class/[Customer]<>1->*[Order], [Customer]-[note: Aggregate Root{bg:cornsilk}]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[Customer]%3C%3E1-%3E*[Order],%20[Customer]-[note:%20Aggregate%20Root%7Bbg:cornsilk%7D]" >
    
- 继承(Inheritance)

    使用`^-`表示类的继承，右边的类是子类。

        <img src="http://yuml.me/diagram/nofunky/class/[Wages]^-[Salaried], [Wages]^-[Contractor]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[Wages]%5E-[Salaried],%20[Wages]%5E-[Contractor]" >
    
- 接口继承(Interface Inheritance)

    接口继承用`^-.-`来表示。

        <img src="http://yuml.me/diagram/nofunky/class/[<<ITask>>]^-.-[NightlyBillingTask]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[%3C%3CITask%3E%3E]%5E-.-[NightlyBillingTask]" >
    
- 依赖(Dependencies)

    类的依赖用`-.->`来表示，依赖是最弱的关联关系，一般用来表示类方法的参数或者实现用到了依赖类。

        <img src="http://yuml.me/diagram/nofunky/class/[HttpContext]uses -.->[Response]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[HttpContext]uses%20-.-%3E[Response]" >
    
- 接口(Interface)

    和类名相比，接口的名称一般包含在`<<>>`中。

        <img src="http://yuml.me/diagram/nofunky/class/[<<IDisposable>>;Session]" >

    <img src="http://yuml.me/diagram/nofunky/class/[%3C%3CIDisposable%3E%3E;Session]" >
    
- 类定义(Class with Details)

    可以在类符号`[]`中定义类的所有成员。使用`|`表示类名与类成员变量和成员函数的分割符，不同的成员之间用`;`隔开，使用`+`，`-`分别表示公开和私有成员。

        <img src="http://yuml.me/diagram/nofunky/class/[User|+Forename+;Surname;+HashedPassword;-Salt|+Login();+Logout()]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[User%7C+Forename+;Surname;+HashedPassword;-Salt%7C+Login();+Logout()]" >

- 完整的示例

        <img src="http://yuml.me/diagram/nofunky/class/[note: You can stick notes on diagrams too!{bg:cornsilk}],[Customer]<>1-orders 0..*>[Order], [Order]++*-*>[LineItem], [Order]-1>[DeliveryMethod], [Order]*-*>[Product], [Category]<->[Product], [DeliveryMethod]^[National], [DeliveryMethod]^[International]" >
        
    <img src="http://yuml.me/diagram/nofunky/class/[note:%20You%20can%20stick%20notes%20on%20diagrams%20too!%7Bbg:cornsilk%7D],[Customer]%3C%3E1-orders%200..*%3E[Order],%20[Order]++*-*%3E[LineItem],%20[Order]-1%3E[DeliveryMethod],%20[Order]*-*%3E[Product],%20[Category]%3C-%3E[Product],%20[DeliveryMethod]%5E[National],%20[DeliveryMethod]%5E[International]" >

## 时序图

首先在文件头加入如下 javascript 文件：

        <script type="text/javascript" src="http://www.websequencediagrams.com/service.js"></script>

- 同步/异步/返回消息(Synchronous/Asynchronous/Return Message)

    一般使用实心箭头`->`表示同步消息或调用，开箭头`->>`表示异步消息或调用，虚箭头`-->`或`-->>`表示返回消息。

        <div class=wsd wsd_style="rose" ><pre>
        # This is a comment.            
        Alice->Bob: Filled arrow
        Alice->>Bob: Open arrow
        Bob-->Alice: Dotted line
        Bob-->>Alice: Dotted Line, open arrow
        </pre></div>
        

    <div class=wsd wsd_style="rose" ><pre>
    # This is a comment.
    Alice->Bob: Filled arrow
    Alice->>Bob: Open arrow
    Bob-->Alice: Dotted line
    Bob-->>Alice: Dotted Line, open arrow
    </pre></div>

- 定义参与者的顺序

    通过`participant`可以定义`角色`在时序图中的显示顺序，而不是按照缺省的参与者被使用顺序来显示。并且可以定义参与者的别名。

        <div class=wsd wsd_style="rose" ><pre>
        participant Bob
        participant Alice
        participant "I have a really\nlong name" as L
        #
        Alice->Bob: Authentication Request
        Bob->Alice: Authentication Response
        Bob->L: Log transaction
        </pre></div>

    <div class=wsd wsd_style="rose" ><pre>
    participant Bob
    participant Alice
    participant "I have a really\nlong name" as L
    #
    Alice->Bob: Authentication Request
    Bob->Alice: Authentication Response
    Bob->L: Log transaction
    </pre></div>

- 自关联消息(Self-Message)

    参与者可以发送一个消息给自己。你可以用`\n`将文字切分成多行。

        <div class=wsd wsd_style="rose" ><pre>
        Alice->Alice: This is a signal to self.\nIt also demonstrates \nmultiline \ntext.
        </pre></div>

    <div class=wsd wsd_style="rose" ><pre>
    Alice->Alice: This is a signal to self.\nIt also demonstrates \nmultiline \ntext.
    </pre></div>

- 分组消息

    通过`alt/else`，`opt`和`loop`，将消息分组，组头显示分组定义的文本信息，`end`关键字用来结束一个分组。分组可以嵌套。

        <div class=wsd wsd_style="rose" ><pre>
        Alice->Bob: Authentication Request
        alt successful case
            Bob->Alice: Authentication Accepted
        else some kind of failure
            Bob->Alice: Authentication Failure
            opt
                loop 1000 times
                    Alice->Bob: DNS Attack
                end
            end
        else Another type of failure
            Bob->Alice: Please repeat
        end
        </pre></div>

    <div class=wsd wsd_style="rose" ><pre>
    Alice->Bob: Authentication Request
    alt successful case
        Bob->Alice: Authentication Accepted
    else some kind of failure
        Bob->Alice: Authentication Failure
        opt
            loop 1000 times
                Alice->Bob: DNS Attack
            end
        end
    else Another type of failure
        Bob->Alice: Please repeat
    end
    </pre></div>

- 备注(Notes)

    使用`note left of`，`note right of`和`note over`分别定义左/右/中显示的备注，可以包含多行，`end note`用来结束该段`note`。

        <div class=wsd wsd_style="rose" ><pre>
        participant Alice
        participant Bob
        #
        note left of Alice 
        This is displayed 
        left of Alice.
        end note
        note right of Alice: This is displayed right of Alice.
        note over Alice: This is displayed over Alice.
        note over Alice, Bob: This is displayed over Bob and Alice.
        </pre></div>

    <div class=wsd wsd_style="rose" ><pre>
    participant Alice
    participant Bob
    #
    note left of Alice 
    This is displayed 
    left of Alice.
    end note
    note right of Alice: This is displayed right of Alice.
    note over Alice: This is displayed over Alice.
    note over Alice, Bob: This is displayed over Bob and Alice.
    </pre></div>

- 生命线的激活和终止(Activation/Destruction)

    `+`来表示激活**被发送者**，`-`表示终止**发送者**。`destroy`关键字可以将销毁该参与者。

        <div class=wsd wsd_style="rose" ><pre>
        User->+A: DoWork
        A->+B: <<createRequest>>
        B->+C: DoWork
        C-->B: WorkDone
        destroy C
        B-->-A: RequestCreated
        A->User: Done
        </pre></div>

    <div class=wsd wsd_style="rose" ><pre>
    User->+A: DoWork
    A->+B: <<createRequest>>
    B->+C: DoWork
    C-->B: WorkDone
    destroy C
    B-->-A: RequestCreated
    A->User: Done
    </pre></div>


<script type="text/javascript" src="http://www.websequencediagrams.com/service.js"></script>

---

## 其他工具

- [JUMLY](http://jumly.herokuapp.com/ "Javascript library, UML diagram rendering engine")
- [yUML command line tool](https://github.com/wandernauta/yuml "unlike yUML webapp, it provides command line tool to render UML diagram.")
- [Scruffy UML](https://github.com/aivarsk/scruffy "yUML like command line tool.")

