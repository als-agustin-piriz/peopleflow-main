/* eslint-disable no-param-reassign */
const proxy = require('express-http-proxy');
const {getServiceBaseUrl, ServiceKey} = require('../../utils/helpers/service.helper');
const {getHeaders} = require('../../helpers/headers.helper');

function injectHeaders(req) {
    return opts => {
        const headers = getHeaders(req);
        opts.headers = {
            ...opts.headers,
            ...headers,
        };

        opts.headers.Authorization = req.user?.at;
        return opts;
    };
}

function proxyMiddleware(baseUrl, {resDecorator} = {}) {
    return (req, res, next) => {
        proxy(baseUrl, {
            proxyReqOptDecorator: injectHeaders(req),
            userResDecorator: resDecorator,
        })(req, res, next);
    };
}

function declareProxies(app) {
    const MicroServiceURL = getServiceBaseUrl(ServiceKey.UserService);
    app.use(`/user`, proxyMiddleware(MicroServiceURL));
}

module.exports = {
    declareProxies,
};
