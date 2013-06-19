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

Compile the coffee to js
``` bash
$ bbb coffee
```

Compile and run the dev server
``` bash
$ bbb
$ bbb server
```

Compile and run the debug version of server
``` bash
$ bbb debug
$ bbb server:debug
```

Compile and run the release version of server
``` bash
$ bbb release
$ bbb server:release
```

*The coffee grunt task is copied from https://github.com/avalade/grunt-coffee, and I only add a 'strip' option to support compile coffee files to js files recursively.*
