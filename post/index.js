const express = require('express');

const config = require('../config');
const app  = express();

const errors = require('../utils/errors.js');
const postRouter = require('./components/post/router')


// Parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/posts', postRouter)

// Error middleware
app.use(errors);

app.listen(config.postService.port, function () {
    console.log(`POST SERVICE ON: ${config.port}`)
});