import { v4 } from 'uuid';

console.log('nodeenv', process.env.NODE_ENV)
const localEnv = process.env.NODE_ENV === 'development'

const sessionConfig = {
    name: `${localEnv ? '' : '__Secure-'}PeopleFlow.sid`,
    genid: () => v4(),
    saveUninitialized: true,
    proxy: true,
    resave: false,
    rolling: true,
    secret: process.env.SECRET_SESSION,
    cookie: {
        maxAge: 60000 * 90,
        httpOnly: !localEnv,
        sameSite: localEnv ? 'lax' : 'none',
        secure: !localEnv,
    },
    // store: redisStore,
};

export default sessionConfig;
