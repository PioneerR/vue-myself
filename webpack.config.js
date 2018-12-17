const {
  resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = './'

module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style', 'css', 'scss']
      },
      {
        test: /favicon\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery"
    }),
    new webpack.optimize.UglifyJsPlugin({
		  compress: {
		    warnings: false,
		    drop_console: true,
		    pure_funcs: ['console.log']
		  },
		  sourceMap: false
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin({
    	analyzerMode: 'server',
    	analyzerHost: '127.0.0.1',
    	analyzerPort: 8888,
    	openAnalyzer: true,
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),// 在webpack.config.js中我们不能使用../ 以及./这种形式的路径方式，
                                     // 而是通过 path.join 和 __dirname 这种形式来表示路径，否则会报错
      '@': resolve('src')
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 8001,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
