const express = require('express');
const path = require('path');
const fs = require('fs');

const micrositeAppRouter = express.Router();

// Sirve los assets de Webpack del cliente
micrositeAppRouter.use('/static', express.static(path.resolve(__dirname, '../client')));

micrositeAppRouter.get('*', async (req, res) => {
  const htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf-8');
  res.send(htmlTemplate);
});

module.exports = { micrositeAppRouter };
