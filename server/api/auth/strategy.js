const passport = require('passport');
const {Strategy: CustomStrategy} = require('passport-custom');
const {userLogin} = require("@server/services/UserService");

passport.use('custom-login', new CustomStrategy(async (req, done) => {
    // const {email, password} = req.body;
    try {
        // const response = await userLogin(email, password);

        const mock = {
            at: 'asdadas',
            name: 'Agu',
            lastName: 'Piriz',
            email: 'ap@test.com',
            modules: ['recruitment:reception', 'home']

        }

        const user = mock;
        return done(null, user);
    } catch (err) {
        return done(null, false, {message: 'Login failed'});
    }
}));