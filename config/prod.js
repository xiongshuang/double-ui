const { resolve, join } = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理垃圾文件
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./base');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const config = {
    entry: {
        index: resolve(__dirname, '../src/main.tsx') // 入口文件
    },
    output: {
        path: resolve(__dirname, '../production'),
        filename: 'javascript/[name].[contenthash:5].js', // [name] 是entry的key
        publicPath: './',
        assetModuleFilename: 'images/[name].[hash:5][ext][query]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: join(__dirname, '../src/indexProd.html'), // 引入模版
            favicon: join(__dirname, '../src/assets/favicon.ico'),
            filename: 'index.html',
            minify: { // 对index.html压缩
                collapseWhitespace: true, // 去掉index.html的空格
                removeAttributeQuotes: true // 去掉引号
            },
            hash: true, // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
            inlineSource: '.(js|css)'
        }),
        new CleanWebpackPlugin({
            verbose: true, // 打印被删除的文件
            protectWebpackAssets: false, // 允许删除cleanOnceBeforeBuildPatterns中的文件
            cleanOnceBeforeBuildPatterns: [resolve(__dirname, '../production')]
        }),
        new MiniCssExtractPlugin({ // 分离css
            filename: 'stylesheets/[name].[contenthash:5].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../node_modules/react/umd/react.production.min.js'),
                    to: 'modules'
                },
                {
                    from: resolve(__dirname, '../node_modules/react-dom/umd/react-dom.production.min.js'),
                    to: 'modules'
                },
                {
                    from: resolve(__dirname, '../node_modules/react-router-dom/umd/react-router-dom.min.js'),
                    to: 'modules'
                },
                {
                    from: resolve(__dirname, '../node_modules/react-transition-group/dist/react-transition-group.min.js'),
                    to: 'modules'
                }
            ]
        })
    ],
    optimization: { // 抽离第三方插件
        // minimize: true,
        minimizer: [
            new ESBuildMinifyPlugin({ target: 'es2015', css: true })
        ],
        splitChunks: {
            chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            minChunks: 3, // 共享最少的chunk数，使用次数超过这个值才会被提取
            maxAsyncRequests: 5, // 最多的异步chunk数
            maxInitialRequests: 5, // 最多的同步chunks数
            cacheGroups: { // 这里开始设置缓存的 chunks
                defaultVendors: { // key 为entry中定义的 入口名称，new webpack.ProvidePlugin中的库
                    test: /[\\/]node_modules[\\/]/, // 正则规则验证，如果符合就提取 chunk (指定是node_modules下的第三方包)
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    enforce: true,
                    reuseExistingChunk: true
                },
                components: {
                    test: /[\\/]src[\\/]components[\\/]/,
                    name: 'components',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    target: ['web', 'es5']
};

module.exports = merge(baseConfig, config);
