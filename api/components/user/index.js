// const store = require('../../../store/mysql');
const store = require('../../../store/remote-mysql');
const cache = require('../../../store/redis');

/**
 * Load service and inject the database
 */

const service = require('./service')


module.exports = service(store, cache);