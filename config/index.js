// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
  dev: {
    env: "development",
    port: 8080,
    index: path.resolve(__dirname, '../example/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    autoOpenBrowser: false,
    assetsSubDirectory: '/',
    assetsPublicPath: path.resolve(__dirname, '../example'),
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
