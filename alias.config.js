const path = require('path');

const modules = path.resolve('./client/modules');

const specificModules = {
    '@home': `${modules}/home`,
    '@recruitment': `${modules}/recruitment`
};

module.exports = {
    '@client': path.resolve('./client/'),
    '@state': path.resolve('./client/state'),
    '@components': path.resolve('./client/components'),
    '@server': path.resolve('./server/'),
    ...specificModules,
};
