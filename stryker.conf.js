module.exports = function(config) {
  config.set({
    testRunner: 'mocha',
    mutator: 'javascript',
    transpilers: ['webpack', 'babel'],
    reporter: ['html', 'clear-text', 'progress'],
    testFramework: 'mocha',
    coverageAnalysis: 'off',
    mutate: ['src/**/*.js', '!**/*.scss'],
    webpack: {
      configFile: 'webpack.config.js'
    },
    babelrcFile: '.babelrc',
    mochaOptions: {
      files: [ 'test/**/*.test.js' ],
      ui: 'bdd',
      require: [ 'ignore-styles', 'jsdom-global/register', 'babel-polyfill' ]
    }
  });
};
