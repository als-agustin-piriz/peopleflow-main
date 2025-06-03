const {getServiceBaseUrl, ServiceKey} = require('@server/utils/helpers/service.helper');
const axios = require("axios");

const userLogin = async (email, password) => {
    const BASE_URL = getServiceBaseUrl(ServiceKey.UserService);
    const URL = `${BASE_URL}/login`;
    const body = {
        email, password,
    }
    return axios.post(URL, body);
};

module.exports = userLogin;
