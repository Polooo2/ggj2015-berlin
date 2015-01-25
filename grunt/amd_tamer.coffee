module.exports =
  dist:
    options:
      namespace: '<%= package.name %>',
      base: 'src/'
    src: ['src/**/*.js'],
    dest: 'build/debug/js/<%= package.name %>.js'
  all:
    options:
      base: 'build/debug/js/'
      footer: '//# sourceMappingURL=all.js.map'
    src: ['build/debug/js/**/*.js']
    dest: 'build/debug/all.js'
