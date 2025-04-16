const path = require('path');
const nconf = require('nconf');

const ENV = process.env.NODE_ENV || 'development';
console.log('Cargando configuración para el ambiente:', ENV);

// Usa process.cwd() para obtener la ruta raíz del proyecto
const configDir = path.join(process.cwd(), 'config');
const envFilePath = path.join(configDir, `${ENV}.json`);
const defaultFilePath = path.join(configDir, 'default.json');

console.log('Archivo de configuración del ambiente:', envFilePath);
console.log('Archivo de configuración por defecto:', defaultFilePath);

nconf
    .env() // Carga variables de entorno
    .file('env', { file: envFilePath }) // Carga el archivo del ambiente
    .file('default', { file: defaultFilePath }); // Carga el archivo por defecto

console.log('Configuración cargada:', nconf.get()); // Muestra toda la configuración cargada


module.exports = nconf;