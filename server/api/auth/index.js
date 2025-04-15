const express = require('express');
// Dejo este middleware, para hacer rutas privadas, donde nos importe que solo
// la consuman usuarios logueados,

// eslint-disable-next-line consistent-return
// const authenticationMiddleware = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.status(HttpResponseCodes.UNAUTHORIZED).send(ErrorResponse('Unauthorized'));
// };

// passport.use('customStrategy', customStrategy);

// // Estas 2 funciones, son para decidir, que modelo de ususario se guarda en la request.
// passport.serializeUser((user, cb) => {
//   process.nextTick(() => {
//     cb(null, user);
//   });
// });

// passport.deserializeUser((user, cb) => {
//   process.nextTick(() => cb(null, user));
// });

const userRouter = express.Router();

// userRouter.get('/login', UserController.login);
// userRouter.post('/logout', UserController.logout);
// userRouter.put('/session', authenticationMiddleware, UserController.refreshSession);

module.exports = { userRouter };
