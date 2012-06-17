/*
 * grunt-coffee
 * https://github.com/avalade/grunt-coffee
 *
 * Copyright (c) 2012 Aaron D. Valade
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  var path = require('path');

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('coffee', 'Compile CoffeeScript files', function() {
    var dest = this.file.dest,
        strip = this.data.strip,
        options = this.data.options;
    if ( typeof strip === "string" ) {
      strip = new RegExp( "^" + grunt.template.process( strip, grunt.config() ).replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" ) );
    }
    grunt.file.expandFiles(this.file.src).forEach(function(filepath) {
      grunt.helper('coffee', filepath, dest, strip, options);
    });

    if (grunt.task.current.errorCount) {
      return false;
    }
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('coffee', function(src, destPath, strip, options) {
    var coffee = require('coffee-script'),
        js = '',
        targetFile = strip ? src.replace(strip, "") : src,
        targetDir = path.dirname(targetFile),
        targetFilename = path.basename(targetFile, '.coffee') + '.js',
        dest = path.join(destPath, targetDir, targetFilename);

    options = options || {};
    if( options.bare !== false ) {
      options.bare = true;
    }

    try {
      js = coffee.compile(grunt.file.read(src), options);
      grunt.file.write(dest, js);
    } catch (e) {
      grunt.log.error("Unable to compile your coffee", e);
    }
  });

};
