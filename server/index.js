const express = require('express');
const { publicEnvMiddleware } = require('./middlewares/env');
const { micrositeAppRouter } = require('./app');
const { micrositeApiRouter } = require('./api');
const { axiosMiddleware } = require('./middlewares/axios');

const app = express();
const PORT = 4000;

app.use(express.json());


app.use(`/api`, micrositeApiRouter);
app.use(`/`, axiosMiddleware, micrositeAppRouter);


app.listen(PORT, () => {
    console.log(`BFF Shell listening on http://localhost:${PORT}`);
});
