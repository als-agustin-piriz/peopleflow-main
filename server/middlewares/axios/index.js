const { default: axios } = require("axios");
const { getHeaders } = require("../../helpers/headers.helper");
const { default: axiosInstance } = require("./axiosInstance");

const axiosMiddleware = (req, res, next) => {
  const headers = getHeaders(req);

  req.axios = axiosInstance();

  req.axios.defaults.headers = {
    ...req.axios.defaults.headers,
    ...headers,
  };
  next();
};

module.exports = { axiosMiddleware };
