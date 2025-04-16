const express = require('express');
const { micrositeAppRouter } = require('./app');
const { micrositeApiRouter } = require('./api');
const { axiosMiddleware } = require('./middlewares/axios');
const pkg = require('../package.json');
import { setupAuth } from "./api/auth";
const app = express();
const cors = require('cors');
const PORT = 4000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4000', // URL donde corre tu Shell
    credentials: true,
}));


setupAuth(app);


app.use(
    `/api/${pkg.name}`,
    axiosMiddleware,
    micrositeApiRouter,
);

app.use(`/`, micrositeAppRouter);


app.listen(PORT, () => {
    console.log(`BFF Shell listening on http://localhost:${PORT}`);
});
