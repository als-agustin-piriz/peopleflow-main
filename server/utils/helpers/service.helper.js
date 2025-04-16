const nconf = require('../../../config');

const ServiceKey = {
  UserService: 'userService',
};

const getServiceBaseUrl = serviceKey => {
  const service = nconf.get(serviceKey);
  return service.url;
};

module.exports = {
  ServiceKey,
  getServiceBaseUrl,
};
