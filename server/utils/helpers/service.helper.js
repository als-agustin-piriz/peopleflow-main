const nconf = require('../../../config');

const ServiceKey = {
    UserService: 'authService',
};

const getServiceBaseUrl = serviceKey => {
    const serviceUrl = nconf.get(`${serviceKey}:url`);
    if (!serviceUrl) {
        throw new Error(`No se encontró la configuración para el servicio: ${serviceKey}`);
    }
    return serviceUrl;
};

module.exports = {
    ServiceKey,
    getServiceBaseUrl,
};
