const express = require('express');

const { publicEnvMiddleware } = require('@server/middlewares/env');
const { userRouter } = require('@server/api/auth');

const micrositeApiRouter = express.Router();

micrositeApiRouter.use('/', userRouter);
micrositeApiRouter.use(`/env`, publicEnvMiddleware);

module.exports = { micrositeApiRouter };
