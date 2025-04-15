const { default: axios } = require("axios");
const { getHeaders } = require("../../helpers/headers.helper");

const axiosMiddleware = (req, res, next) => {
  const headers = getHeaders(req);

  req.axios = axios.create({
    headers,
  });

  req.axios.defaults.headers = {
    ...req.axios.defaults.headers,
    ...headers,
  };
  next();
};

module.exports = { axiosMiddleware };
