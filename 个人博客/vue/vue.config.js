// vue.config.js
module.exports = {
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8080,
        // 设置代理
        proxy: {
        	// 监听一个别名，下面替换掉
            '/api': {
                // 目标 API 地址
                target: process.env.VUE_APP_BASE_API, // 后台接口地址
                ws: true, // 代理 websockets
                secure: false, // 如果是https接口
                changeOrigin: true, // 是否跨域
               
            },
            '/api/upload': {
                // 目标 API 地址
                target: process.env.VUE_APP_BASE_API, // 后台接口地址
                ws: true, // 代理 websockets
                secure: false, // 如果是https接口
                changeOrigin: true, // 是否跨域
            }
        }
    }
}