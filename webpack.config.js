const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['./src/main.js'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.min.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.vue', '.json', '.js', '.css'],
    alias: {
      'vue': 'vue/dist/vue.common.js',

      // custom paths
      '@src': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@config': path.resolve(__dirname, 'src/config/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@locale': path.resolve(__dirname, 'src/locale/'),
      '@store': path.resolve(__dirname, 'src/store/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            extractCSS: true
          }
        }]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: { name: '[path][name].[hash].[ext]' }
      },
      {
        test: /\.css$/,
        // loader: 'css-loader'
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract('css-loader'))
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': require('./.env') }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('build.min.css', { allChunks: true })
  ]
}
