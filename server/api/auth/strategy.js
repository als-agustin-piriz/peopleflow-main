const passport = require('passport');
const {Strategy: CustomStrategy} = require('passport-custom');
const axios = require('axios');

passport.use('custom-login', new CustomStrategy(async (req, done) => {
    const {email, password} = req.body;
    try {
        const response = await axios.post('https://api.externo.com/login', {
            email,
            password,
        });

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