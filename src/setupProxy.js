const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api/v3/contacts',
        createProxyMiddleware({
            target: 'https://invoice.zoho.in',
            changeOrigin: true,
        })
    );
    app.use(
        '/api/v3/invoices',
        createProxyMiddleware({
            target: 'https://invoice.zoho.in',
            changeOrigin: true,
        })
    );

};