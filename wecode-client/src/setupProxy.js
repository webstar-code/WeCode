const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/auth/google', {target: 'http://localhost:4000/'}));
    app.use(createProxyMiddleware('/auth/facebook', {target: 'http://localhost:4000/'}));
    app.use(createProxyMiddleware('/api/user', {target: 'http://localhost:4000/'}))
    app.use(createProxyMiddleware('/api/upload', {target: 'http://localhost:4000/'}))
    app.use(createProxyMiddleware('/api/image', {target: 'http://localhost:4000/'}))

    app.use(createProxyMiddleware('/api/*', {target: 'http://localhost:4000/'}))
}