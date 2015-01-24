module.exports = (grunt) ->
  require('time-grunt')(grunt)
  endOfLine = require('os').EOL
  require('load-grunt-config') grunt,
    jitGrunt:
      staticMappings:
        lyriaData: 'grunt-lyria-assets'
        lyriaAssetList: 'grunt-lyria-assets'
        lyriaScene: 'grunt-lyria-assets'
        releaseBranch: 'grunt-release-branch'
        preReleaseBranch: 'grunt-release-branch'

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
  grunt.registerTask 'deploy', 'Builds project in production mode and deploys to Github Pages', ['clean:gh_pages',
                                                                                                 'production',
                                                                                                 'gh-pages']

  grunt.registerTask 'build', 'Builds the default project', ['development']

  grunt.registerTask 'test', ['lint']

  # The future in order
  grunt.registerTask 'observe', ['development', 'watch']

  grunt.registerTask 'default', 'Default task', ['concurrent']


  `grunt.registerTask('csvToJson', 'move dialogs from csv to json', function() {
      var csvFile = grunt.file.read('dialogs.csv');
      var csvLines = csvFile.split(endOfLine);
      var files = {};
      csvLines.forEach(function(line) {
          var cells = line.split(',"');
          var text;
          // if no cells could be found, that means, that the string isnt escaped
          if (!cells[1]) {
              cells = line.split(',');
          } else {
              cells = [cells[0]].concat(cells[1].split('",,'));
          }
          var code = cells[0].substr(2);
          if (code === '') {
            return;
          }
          // remove ending double quotes
          var text = cells[1];
          var emotion = cells[2];
          var currentName = cells[0][1];
          if (!files[currentName]) {
              files[currentName] = {
                  'Bark': {},
                  'Meryl': {},
                  'Armoise': {}
              };
          }
          switch (cells[0][0]) {
              case 'D':
                  files[currentName].Bark[code] = text;
                  break;
              case 'M':
                  files[currentName].Meryl[code] = text;
                  break;
              case 'A':
                  files[currentName].Armoise[code] = text;
                  break;
          }

      });
      Object.keys(files).forEach(function(key) {
          // write last element to a json file
          grunt.file.write('assets/data/dialog/' + key + '.json', JSON.stringify(files[key], '  '));
      });

  });`
