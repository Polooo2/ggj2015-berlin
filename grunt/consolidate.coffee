module.exports =
  options:
    engine: 'handlebars'
  development:
    options:
      local:
        livereload: true,
        mainModule: '<%= package.name %>',
        title: 'Flirtevator - Development build',
    files:
      'build/debug/index.html': 'template/index.html'
  production:
    options:
      local:
        livereload: false,
        mainModule: '<%= package.name %>'
        title: 'Flirtevator'
    files:
      'build/production/index.html': 'template/index.html'
