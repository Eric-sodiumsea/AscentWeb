// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', { // 遇见api1前缀的请求，就会触发该代码配置
            target: 'http://localhost:8080', // 请求转发给谁
            changeOrigin: true, // 默认值为false，改为true，控制服务器收到的请求头中Host的值
            pathRewrite: { '^/api1': '' }
        })
    )
}