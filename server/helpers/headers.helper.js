function getHeaders(req) {
  const headers = {};
  const Origin = 'Origin';
  const Cookie = 'Cookie';
  const Authorization = 'Authorization';

  const { user } = req;
  const token = user?.at || req.axios?.defaults.headers[Authorization];

  headers[Origin] = req.header('Host');
  headers[Cookie] = req.header(Cookie);
  headers[Authorization] = token;
  return headers;
}
module.exports = { getHeaders };
