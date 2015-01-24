module.exports =
  app:
    options:
      releaseBranch: 'gh-pages',
      remoteRepository: 'origin',
      distDir: 'build/production',
      commitMessage: 'RELEASE',
      commit: true,
      push: true,
      orphan: true,
      blacklist: [
        '.git'
      ]
