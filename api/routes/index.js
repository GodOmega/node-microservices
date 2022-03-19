// API Versions
const apiV1 = require('./versions/v1')

// Routes
module.exports = (app) => {
    app.use('/api/v1', apiV1);
}