const express = require('express');
const swaggerUi = require('swagger-ui-express')

const config = require('../config');
const app  = express();
const loadRoutes = require('./routes');

const errors = require('../utils/errors.js');

// Parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation 
const swaggerDoc = require('./swagger.json');

// Routes
loadRoutes(app)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


// Error middleware
app.use(errors);

app.listen(config.port, function () {
    console.log(`Server on port: ${config.port}`)
});