const store = require('../../../store/mysql');

/**
 * Load service and inject the database
 */

const service = require('./service')


module.exports = service(store);