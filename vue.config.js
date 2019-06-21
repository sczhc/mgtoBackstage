const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    // 关闭eslint
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: {
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            // warnings: false,
                            drop_console: true, //console
                            drop_debugger: false // pure_funcs: ['console.log']移除
                        }
                    }
                })
            ]
        },
        devtool: 'source-map'
    },
    devServer: {
        host: 'localhost',
        port: '3333',
        open: true
    }
}