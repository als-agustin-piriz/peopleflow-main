const express = require('express');

const { publicEnvMiddleware } = require('../middlewares/env');
const { userRouter } = require('../api/auth');

const micrositeApiRouter = express.Router();

// micrositeApiRouter.use('/', userRouter);
micrositeApiRouter.use(`/env`, publicEnvMiddleware);

module.exports = { micrositeApiRouter };
