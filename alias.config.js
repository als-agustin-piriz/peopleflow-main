const path = require('path');

const modules = path.resolve('./client/modules');

const specificModules = {
    '@home': `${modules}/home`,
    '@recruitment': `${modules}/recruitment`,
    '@auth': `${modules}/auth`
};

module.exports = {
    '@client': path.resolve('./client/'),
    '@state': path.resolve('./client/state'),
    '@utils': path.resolve('./client/utils'),
    '@routes': path.resolve('./client/routes'),
    '@services': path.resolve('./client/services'),
    '@context': path.resolve('./client/context'),
    '@configuration': path.resolve('./client/configuration'),
    '@components': path.resolve('./client/components'),
    '@server': path.resolve('./server/'),
    ...specificModules,
};
