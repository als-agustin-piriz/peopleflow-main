const express = require('express');
const UserController = require('../../controllers/UserControllers');
const passport = require('passport');
const sessionConfig = require('./session.config')
const session = require('express-session');
const { HttpResponseCodes } = require('../../utils/constants/http.constant');
const { ErrorResponse } = require('../../models/ServiceResponse');
require('./strategy')
require('./session')
const cors = require("cors");

const userRouter = express.Router();

const authenticationMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(HttpResponseCodes.UNAUTHORIZED).send(ErrorResponse('Unauthorized'));
};

userRouter.post('/login', (req, res, next) => {
  passport.authenticate('custom-login', (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Login failed' });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      // la sesión ya fue seteada y la cookie enviada automáticamente
      res.json({ success: true, user });
    });
  })(req, res, next);
});

userRouter.get('/session', authenticationMiddleware, UserController.getSession);

userRouter.post('/logout', (req, res, next) => {
  try {
    req.logout(err => {
      if (err) return next(err);

      req.session.destroy(err => {
        if (err) return next(err);

        res.clearCookie('PeopleFlow.sid');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
      });
    });
  } catch (error) {
    console.log(error)
  }
});


const setupAuth = (app) => {
  app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
  }));
  app.use(session(sessionConfig.default));
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = { userRouter, setupAuth };
