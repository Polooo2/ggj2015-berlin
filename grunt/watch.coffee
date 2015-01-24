module.exports =
  options:
    livereload: false
  stylus:
    files: 'stylus/**/*.styl',
    tasks: ['stylus:development']
  assetList:
    files: 'assets/**/*',
    tasks: ['lyriaAssetList']
  scenes:
    files: 'assets/scenes/*',
    tasks: ['lyriaScene']
  i18nData:
    files: 'assets/i18n/**/*.json',
    tasks: ['lyriaData']
  template:
    files: 'template.html',
    tasks: ['bower']
  concat:
    files: 'src/**/*.js',
    tasks: ['amd_tamer']
