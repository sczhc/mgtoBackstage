const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    // 关闭eslint
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    devServer: {
        host: 'localhost',
        port: '3333',
        open: true
    }
}