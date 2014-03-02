
// Copy multitask definition, copied from jquery grunt.js file.
// It takes src/dest/rename/strip params.
module.exports = function(grunt) {

  grunt.registerMultiTask( "copy", "Copy files to destination folder and replace @VERSION with pkg.version", function() {
    function replaceVersion( source ) {
      return source.replace( /@VERSION/g, grunt.config( "pkg.version" ) );
    }
    function copyFile( src, dest ) {
      if ( /(js|css)$/.test( src ) ) {
        grunt.file.copy( src, dest, {
          process: replaceVersion
        });
      } else {
        grunt.file.copy( src, dest );
      }
    }
    var files = grunt.file.expandFiles( this.file.src ),
      target = this.file.dest + "/",
      strip = this.data.strip,
      renameCount = 0,
      fileName;
    if ( typeof strip === "string" ) {
      strip = new RegExp( "^" + grunt.template.process( strip, grunt.config() ).replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" ) );
    }
    files.forEach(function( fileName ) {
      var targetFile = strip ? fileName.replace( strip, "" ) : fileName;
      copyFile( fileName, target + targetFile );
    });
    grunt.log.writeln( "Copied " + files.length + " files." );
    for ( fileName in this.data.renames ) {
      renameCount += 1;
      copyFile( fileName, target + grunt.template.process( this.data.renames[ fileName ], grunt.config() ) );
    }
    if ( renameCount ) {
      grunt.log.writeln( "Renamed " + renameCount + " files." );
    }
  });
};