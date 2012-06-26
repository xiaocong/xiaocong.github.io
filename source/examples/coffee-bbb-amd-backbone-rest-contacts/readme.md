Demo
====

The demo is using coffee-script/bbb/amd/backbone together.

## Build process ##

- Install bbb
``` bash
$ npm install -g bbb
```

- Install coffee-script
``` bash
$ npm install -g coffee-script
```

- Build and Run the server
``` bash compile coffee to js
$ bbb coffee
```

``` bash compile and run server of not concat version
$ bbb
$ bbb server
```

``` bash compile and run server of concat version
$ bbb debug
$ bbb server:debug
```

``` bash compile and run server of optmized version
$ bbb release
$ bbb server:release
```

*The coffee grunt task is copied from https://github.com/avalade/grunt-coffee, and I only add a 'strip' option to support compile coffee files to js files recursively.*