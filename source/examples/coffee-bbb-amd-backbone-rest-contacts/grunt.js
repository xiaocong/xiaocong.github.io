// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
//
module.exports = function(grunt) {

  grunt.initConfig({

    // define the debug/release directories for distribution.
    // TODO, maybe remove it later. I don't like hardcode, but sometimes
    // hardcode is more simple.
    dirs: {
      app: "app",
      debug: "dist/debug", // debug files under the folder
      release: "dist/release" // release files under the folder
    },

    // The clean task ensures all files are removed from the app/, dist/, spec/js directory so
    // that no files linger from previous builds.
    clean: ["<config:dirs.app>", "<config:dirs.debug>", "<config:dirs.release>", "tests/js"],

    // compile coffee to js
    coffee: {
      app: {
        src: ['coffee/**/*.coffee'],
        dest: 'app',
        strip: 'coffee/',
        options: {
            bare: true
        }
      },
      spec: {
        src: ['tests/coffee/**/*.coffee'],
        dest: 'tests/js',
        strip: 'tests/coffee/',
        options: {
            bare: true
        }
      }
    },
    // The lint task will run the build configuration and the application
    // JavaScript through JSHint and report any errors.  You can change the
    // options for this task, by reading this:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
    lint: {
      beforeconcat: [
        "app/**/*.js"
      ],
      afterconcat: [
        "dist/debug/assets/js/require/require.js"
      ]
    },

    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint: {
      options: {
        scripturl: true
      }
    },

    // The copy task is to copy files from source to distribution directory.
    copy: {
      debug: {
        src: ["assets/css/**/*.css", "favicon.ico"],
        renames: {
          "index.noconfig.html": "index.html"
        },
        dest: "<config:dirs.debug>"
      },
      release: {
        src: ["favicon.ico"],
        renames: {
          "index.noconfig.html": "index.html"
        },
        dest: "<config:dirs.release>"
      }
    },

    // The concatenate task is used here to merge the require.js into the
    // application code.  It's named dist/debug/assets/js/require/require.js,
    //because we want to only load one script file in index.html.
    concat: {
      "dist/debug/assets/js/require/require.js": [
        "assets/js/require/require.js",
        "dist/debug/assets/js/require/require.js"
      ]
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    mincss: {
      "dist/release/assets/css/index.css": [
        "assets/css/application.css"
      ]
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    min: {
      "dist/release/assets/js/require/require.js": [
        "dist/debug/assets/js/require/require.js"
      ]
    },

    // Running the server without specifying an action will run the defaults,
    // port: 8080 and host: 127.0.0.1.  If you would like to change these
    // defaults, simply add in the properties `port` and `host` respectively.
    //
    // Changing the defaults might look something like this:
    //
    // server: {
    //   host: "127.0.0.1", port: 9001
    //   debug: { ... can set host and port here too ...
    //  }
    //
    //  To learn more about using the server task, please refer to the code
    //  until documentation has been written.
    // Run below commands will cause:
    // $ bbb server
    //      Run server under . folder. It uses require.js to load all needed
    //      js files, templates and css files.
    // $ bbb server:debug
    //      Run server under dist/debug folder. All js files are merged into one
    //      require.js. Make sure you run 'bbb debug' firstly.
    // $ bbb server:debug
    //      Run server under dist/release folder.
    //      All js files are merged into one require.js and minized. All css
    //      files are merged into one and minized.
    //      Make sure you run 'bbb release' firstly.
    server: {
      port: 8000,
      base: ".",
      folders: {
        "app": "app",
        "assets": "assets",
        "tests": "tests"
      },
      debug: {
        folders: {
          "app": "dist/debug",
          "assets": "dist/debug/assets",
          "": "dist/debug"
        }
      },
      release: {
        folders: {
          "app": "dist/release",
          "assets": "dist/release/assets",
          "": "dist/release"
        }
      }
    },

    // This task uses James Burke's excellent r.js AMD build tool.  In the
    // future other builders may be contributed as drop-in alternatives.
    requirejs: {
      // Include the main configuration file
      mainConfigFile: "app/config.js",

      // Output file
      out: "dist/debug/assets/js/require/require.js",

      // Root application module
      name: "config",

      // Do not wrap everything in an IIFE
      wrap: false
    }

  });

  // load tasks from tasks/ folder.
  grunt.loadTasks("tasks");

  // The default task will remove all contents inside the dist/ folder, compile
  // coffee to js, and lint all your code.
  grunt.registerTask("default", "clean coffee:app lint:beforeconcat coffee:spec");

  // The debug task will remove all contents inside the dist/ folder, lint all
  // js code under app/ folder, copy files to dist/debug folder, combine all
  // application files into require.js, and then concat real require.js with
  // the application require.js file.
  grunt.registerTask("debug", "default copy:debug requirejs concat");

  // The release task will perform debug task, copy files to dist/release folder,
  // minmize css file, and minimize require.js into dist/release.
  grunt.registerTask("release", "debug copy:release mincss min");
};
