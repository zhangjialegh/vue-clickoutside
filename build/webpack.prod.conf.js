const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
 
module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",//入口文件，就是上步骤的src目录下的index.js文件，
    output: {
        path: path.resolve(__dirname, '../dist'),//输出路径，就是上步骤中新建的dist目录，
        publicPath: '/dist/',
        filename: 'clickoutside.min.js',
        library: 'jialecheung',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: "vue"
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              loader: "vue-loader"
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: "style-loader"
                },
                {
                  loader: "css-loader"
                },
                {
                  loader: "scss-loader"
                }
              ]
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader" //babel的相关配置在.babelrc文件里
            },
            {
              test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
              loader: "url-loader",
              query: {
                limit: 30000 //把一些小图片打包为base64
              }
            }
          ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false
            }
          },
          sourceMap: true,
          parallel: true
        })
    ]
};
