---
layout: post
title: "Backbone.sync和资源的CRUD"
date: 2012-06-26 01:33
comments: true
categories: [javascript, backbone.js]
---

{% blockquote Backbone http://documentcloud.github.com/backbone/#Sync Backbone.sync %}
Backbone.sync是Backbone用来和服务器进行数据交换的方法. 每当Collection或者Model的数据发生变化, Backbone就会调用Backbone.sync进行数据的CRUD操作, 这个同步方法的缺省实现是使用(jQuery/Zepto).ajax向服务器发送RESTful JSON请求, 并返回一个jqXHR. 你可以通过重载这个方法来定义不同的持续化策略, 例如WebSocket, XML, 或者本地存储.
{% endblockquote %}

Backbone.sync的函数定义是`function(method, model, [options])`:

- **medhod**: CRUD名称, 可以是`create`, `read`, `update`, `delete`.
- **model**: 需要保存的model, 可以是Backbone.Model或者Backbone.Collection.
- **options**: 所有jQuery请求选项, 包括success和error回掉函数.

Backbone.sync方法的缺省实现是通过标准的RESTful风格的CRUD进行数据的操作. CRUD方法对应的REST接口分别是:

- **create** -> **POST** `/collection`
- **read** -> **GET** `/collection[/id]`
- **update** -> **PUT** `/collection/id`
- **create** -> **DELETE** `/collection/id`

你可以通过重载全局的Backbone.sync, 或者Collection/Model的sync方法来改变其缺省实现.

## localStorage方式实现Backbone.sync

在[地址本示例](http://xiaocong.github.com/examples/coffee-bbb-amd-backbone-contacts/index.html)中, 通过重载全局的Backbone.sync方法,
将Collection/Model的CRUD操作转化为localStorage的对象CRUD操作.

下面是Backbone.sync方法的定义([源码](http://xiaocong.github.com/examples/coffee-bbb-amd-backbone-contacts/coffee/store.coffee)),
首先获得传递进来的model对象或其集合对象的localStorage属性对象, 并将CRUD操作转化为localStorage属性对象的数据CRUD操作:
``` coffeescript
  Backbone.sync = (method, model, options) ->
    store = model.localStorage or model.collection.localStorage

    switch method
      when "read"
        resp = if model.id then store.find(model) else store.findAll()
      when "create"
        resp = store.create(model)
      when "update"
        resp = store.update(model)
      when "delete"
        resp = store.destroy(model)

    if resp
      options.success resp
    else
      options.error "Record not found"
```

<!--more-->

localStorage属性对象的类型定义如下, 数据最后是通过HTML本地存储方法`localStorage.setItem`进行持久化存储:
``` coffeescript
  class Store
    constructor: (@name) ->
      store = localStorage.getItem(@name)
      @data = (store and JSON.parse(store)) or {}

    save: ->
      localStorage.setItem @name, JSON.stringify(@data)

    create: (model) ->
      model.id = model.attributes.id = guid() unless model.id
      @data[model.id] = model
      @save()
      model

    update: (model) ->
      @data[model.id] = model
      @save()
      model

    find: (model) ->
      @data[model.id]

    findAll: ->
      _.values @data

    destroy: (model) ->
      delete @data[model.id]
      @save()
      model
```
在定义Collection对象的时候, 需要定义其localStorage属性为上面定义的`Store`类型:
{% include_code lang:coffeescript coffee-bbb-amd-backbone-contacts/coffee/collections/contacts.coffee %}

## Backbone.sync标准CRUD REST接口

如果采用标准的CRUD REST接口进行数据交换, 那就不用重载Backbone.sync方法, 只需要定义Collection的url属性(字符串或者方法)即可.
{% include_code lang:coffeescript coffee-bbb-amd-backbone-rest-contacts/coffee/collections/contacts.coffee %}

其中`http://xiaocong.herokuapp.com/contacts/`实现了标准的CRUD REST接口:

- **POST** /contacts 生成一个新的地址本记录, 并返回带有新生成的id的地址本数据, 供客户端更新model的id.
- **GET** /contacts 获取所有地址本数据, 由于Collection对象需要的集合数组在返回的JSON字符串的`results`属性中, 因此需要通过`parse`方法转换一下返回的结果.
- **GET** /contacts/id 获取指定id的地址本数据.
- **PUT** /contacts/id 更新指定id的地址本数据.
- **DELETE** /contacts/id 删除指定id的地址本数据

[使用该CRUD REST接口的演示](/examples/coffee-bbb-amd-backbone-rest-contacts/index.html).

下面是托管在[heroku](http://www.heroku.com)上的该REST接口的python源代码:

- 使用[bottle](http://bottlepy.org/docs/dev/)微型web框架实现HTTP路由管理
- 使用[sqlalchemy](http://www.sqlalchemy.org/)实现数据库的持续化存储
- 使用[gevent](http://www.gevent.org/)实现HTTP并发服务
- 通过`Access-Control-Allow-Origin`实现跨域调用

``` python app.py
from gevent import monkey; monkey.patch_all()

from bottle import Bottle, route, get, post, put, delete, request, response, run, static_file, HTTPError
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine, Column, Integer, Sequence, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError

import os

app = Bottle()


@app.route("/")
def hello():
    return "APIs for demo!"


Base = declarative_base()
engine = create_engine(os.environ["SHARED_DATABASE_URL"], echo=True)
create_session = sessionmaker(bind=engine)


class Contact(Base):
    __tablename__ = "contact"
    id = Column(Integer, Sequence('contact_id_seq'), primary_key=True)
    name = Column(String(50))
    email = Column(String(64))

    def __init__(self, name, email):
        self.name = name
        self.email = email

    def __repr__(self):
        return "<Contact('%d', '%s', '%s')>" % (self.id, self.name, self.email)

contactsApp = Bottle()


@contactsApp.hook("after_request")
def crossDomianHook():
    response.headers["Access-Control-Allow-Origin"] = "*"


@contactsApp.route(path="/", method="OPTIONS")
def options1(*args):
    return options(*args)


@contactsApp.route(path="/:id", method="OPTIONS")
def options2(id, *args):
    return options(*args)


def options(*args):
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE"
    if request.headers.get("Access-Control-Request-Headers"):
        response.headers["Access-Control-Allow-Headers"] = request.headers["Access-Control-Request-Headers"]


@contactsApp.post("/")
def createContact(db):
    '''Create contact'''
    contact = Contact(name=request.json["name"], email=request.json["email"])
    db.add(contact)
    db.commit()
    return {"id": contact.id, "name": contact.name, "email": contact.email}


@contactsApp.get("/")
def getAllContacts(db):
    '''Retrieve all contacts'''
    contacts = db.query(Contact)
    return {"results": [{"id":contact.id, "name":contact.name, "email":contact.email} for contact in contacts]}


@contactsApp.get("/:id")
def getContact(id, db):
    '''Retrieve specified contact with id'''
    contact = db.query(Contact).filter_by(id=id).first()
    if contact:
        return {"id": contact.id, "name": contact.name, "email": contact.email}
    raise HTTPError(404, "Contact not found.")


@contactsApp.put("/:id")
def updateContact(id, db):
    '''Update contact'''
    session = create_session()
    try:
        session.query(Contact).filter_by(id=id).update({"name": request.json["name"], "email": request.json["email"]})
        session.commit()
    except SQLAlchemyError, e:
        session.rollback()
        raise HTTPError(500, "Database Error", e)
    finally:
        session.close()


@contactsApp.delete("/:id")
def deleteContact(id, db):
    '''Delete contact'''
    session = create_session()
    try:
        contact = session.query(Contact).filter_by(id=id).first()
        session.delete(contact)
        session.commit()
    except SQLAlchemyError, e:
        session.rollback()
        raise HTTPError(500, "Database Error", e)
    finally:
        session.close()


sqlalchemyplugin = sqlalchemy.Plugin(engine, Base.metadata, create=True)
contactsApp.install(sqlalchemyplugin)
app.mount("/contacts", contactsApp)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    run(app=app, server="gevent", host="0.0.0.0", port=port, reloader=True)
```

