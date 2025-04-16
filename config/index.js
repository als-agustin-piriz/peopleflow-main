const path = require('path');
const nconf = require('nconf');

const ENV = process.env.NODE_ENV || 'local';

nconf
  .env() // primero lee variables de entorno
  .file('env', { file: path.join(__dirname, `${ENV}.json`) }) // override por ambiente
  .file('default', { file: path.join(__dirname, 'default.json') }); // valores comunes

module.exports = nconf;