//webpack.base config
const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PROT = process.env.PROT || 8000

// 多线程
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

//提取公共文件
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

//配置开始
const config = {
    entry: {
        main:[
            'babel-polyfill',
            path.resolve(__dirname, '../src/main.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: '/node_modules/',
            loader: [ 'happypack/loader?id=js' ]
        },
        {
            test: /\.less$/, 
            loader: [ 'happypack/loader?id=less' ]
        },
        {
            test:/\.css$/, 
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        },{
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
        },{
            test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
        },{
            test: /\.(xlsx|xls)(\?.*$|$)/,
            loader: 'url-loader?importLoaders=1&limit=8192&name=files/[name].[ext]'
        }
        ]},
    //自动补全识别后缀
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            components: path.resolve(__dirname, '../src/components'),
            layout: path.resolve(__dirname, '../src/layout'),
            common: path.resolve(__dirname, '../src/assets/common'),
            pages: path.resolve(__dirname, '../src/pages'),
            routes: path.resolve(__dirname, '../src/routes'),
            '@': path.resolve(__dirname, '../src/redux')
        },
    },
    //插件
    plugins: [
        //js 编译多线程 
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env','react','es2015','stage-0','flow'],
                    plugins: ['syntax-dynamic-import','transform-object-rest-spread',"transform-decorators-legacy",["import", [ { "libraryName": "antd", "style": true } ] ] ]
                }
            },{
                loader:'eslint-loader',
                options: {
                    emitWarning: true,
                },
            }],
        }),
        // less 编译多线程
        new HappyPack({
            id: 'less',
            threadPool: happyThreadPool,
            loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
        }),
        //提取css
        new ExtractTextPlugin('styles.css'),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['main'],
            minChunks: 1 // 提取所有entry共同依赖的模块
        }),
        //自动生成html文件
        new htmlWebpackPlugin({
            title:'首页',
            template:path.resolve(__dirname, '../src/index.html'),
            inject: true,
            hash: true,
            cache: true,
            chunks: ['main','vendors'],
            favicon:path.resolve(__dirname, '../favicon.ico'),
        }),
    ]
}

module.exports = config
