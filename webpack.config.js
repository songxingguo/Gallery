const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        html5: true, // 根据HTML5规范解析输入
        collapseWhitespace: true, // 折叠空白区域
        preserveLineBreaks: false,
        minifyCSS: true, // 压缩文内css
        minifyJS: true, // 压缩文内js
        removeComments: false // 移除注释
      }
    }),
    new CopyWebpackPlugin({
        patterns: [{
          from: __dirname + '/src/assets',
          to: __dirname + '/dist/assets'
        }]
      }
    )]
}
