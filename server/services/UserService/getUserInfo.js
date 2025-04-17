const { getServiceBaseUrl, ServiceKey } = require('@server/utils/helpers/service.helper');


const getUserInfo = async ({ axios }) => {
  const BASE_URL = getServiceBaseUrl(ServiceKey.UserService);

  const response = await axios.post(BASE_URL);

  // return User({ ...response?.data, access_token: userToken });
  return response
};

module.exports = getUserInfo;
