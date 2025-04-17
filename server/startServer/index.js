const express = require('express');
console.log('DIR', __dirname)
const {micrositeAppRouter} = require('@server/app');
const {micrositeApiRouter} = require('@server/api');
const {axiosMiddleware} = require('@server/middlewares/axios');
const pkg = require('../../package.json');
const setupAuth = require('@server/api/auth').setupAuth;
const declareProxies = require('@server/middlewares/proxy').declareProxies;
require('dotenv').config();

async function startServer() {
    const app = express();

    app.use(express.json());

    setupAuth(app);

    declareProxies(app);

    app.use(
        `/api/${pkg.name}`,
        axiosMiddleware,
        micrositeApiRouter,
    );

    app.use(`/`, micrositeAppRouter);


    app.listen(process.env.PORT, () => {
        console.log(`BFF Shell listening on http://localhost:${process.env.PORT}`);
    });
}

module.exports = {startServer};