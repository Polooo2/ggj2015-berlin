module.exports =
  options:
    namespace: '<%= package.name %>'
  all:
    dest: 'build/debug/js/assetlist.js'
    src: ['assets/**/*', '!**/README.md', '!assets/font/*']
    filter: 'isFile'
