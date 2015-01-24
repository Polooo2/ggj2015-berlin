module.exports = (grunt) ->
  require('time-grunt')(grunt)

  require('load-grunt-config') grunt,
    jitGrunt:
      staticMappings:
        lyriaData: 'grunt-lyria-assets'
        lyriaAssetList: 'grunt-lyria-assets'
        lyriaScene: 'grunt-lyria-assets'

  grunt.registerTask 'prebuild', 'Task before building the project', ['lyriaScene', 'lyriaAssetList', 'lyriaData',
                                                                      'amd_tamer:dist']
  grunt.registerTask 'lint', 'Lints JavaScript and CSS files', ['jshint']

  grunt.registerTask 'development', 'Development build', ['clean:build', 'csvToJson', 'prebuild', 'copy:assets',
                                                          'copy:root',
                                                          'bowercopy',
                                                          'stylus:development', 'amd_tamer:all',
                                                          'clean:build_debug_js',
                                                          'consolidate:development']
  grunt.registerTask 'production', 'Production build', ['development', 'copy:production', 'uglify',
                                                        'stylus:production', 'consolidate:production']
  grunt.registerTask 'pack', 'Packs project', ['production', 'compress']
  grunt.registerTask 'deploy', 'Builds project in production mode and starts a local server', ['production', 'connect']

  grunt.registerTask 'build', 'Builds the default project', ['development']

  grunt.registerTask 'test', ['lint']

  # The future in order
  grunt.registerTask 'observe', ['development', 'watch']

  grunt.registerTask 'default', 'Default task', ['concurrent']


  `grunt.registerTask('csvToJson', 'move dialogs from csv to json', function() {
      var csvFile = grunt.file.read('dialogs.csv');
      var csvLines = csvFile.split('\n');
      var currentFile = {};
      var currentName = '';
      csvLines.forEach(function(line) {
          var cells = line.split(',"');
          // if no cells could be found, that means, that the string isnt escaped
          if (!cells[1]) {
              cells = line.split(',')
              cells[1] += '"';
          }
          var code = cells[0];
          // remove ending double quotes
          var text = cells[1].substr(-1 * cells[1].length, cells[1].length - 1);
          if (code[1] !== currentName) {
              if (currentName !== '') {
                  // write file with obj to file system
                  grunt.file.write('assets/data/dialog/' + currentName + '.json', JSON.stringify(currentFile));
              }
              currentName = code[1];
              currentFile = {};
          }
          currentFile[cells[0].substr(2)] = text;
      });

      // write last element to a json file
      grunt.file.write('assets/data/dialog/' + currentName + '.json', JSON.stringify(currentFile));
  });`
