function getHeaders(req) {
  const headers = {};
  const Origin = 'Origin';
  const Cookie = 'Cookie';
  headers[Origin] = req.header('Host');
  headers[Cookie] = req.header(Cookie);
  return headers;
}
module.exports = { getHeaders };
