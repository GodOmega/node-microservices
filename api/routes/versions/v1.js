const apiV1 = require('express').Router();

// Components Router
const userRouter = require('../../components/user/router');
const authRouter = require('../../components/auth/router');

// End-Points
apiV1.use('/users', userRouter);
apiV1.use('/auth', authRouter);


module.exports = apiV1;