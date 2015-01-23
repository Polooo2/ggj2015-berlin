module.exports =
  options:
    namespace: '<%= package.name %>'
  i18n:
    options:
      name: 'i18n'
    dest: 'build/debug/js/i18n.js',
    src: ['assets/i18n/**/*.json']
  data:
    options:
      name: 'data'
    dest: 'build/debug/js/data.js',
    src: ['assets/data/**/*.json']
