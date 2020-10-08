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
    }),
    new CopyWebpackPlugin({
        patterns: [{
          from: __dirname + '/src/assets',
          to: __dirname + '/dist/assets'
        }]
      }
    )]
}
