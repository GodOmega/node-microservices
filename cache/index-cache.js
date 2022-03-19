const express = require('express');
const config = require('../config');
const router = require('./routes');

const app = express();


// Parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use( '/', router);

app.listen(config.cacheService.port, () => {
    console.log('REDIS SERVICE ON ', config.cacheService.port)
})