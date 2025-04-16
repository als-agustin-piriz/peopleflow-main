const passport = require('passport');

passport.serializeUser((user, done) => {
  // guardás lo mínimo necesario
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});
