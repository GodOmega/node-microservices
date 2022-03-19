require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    secretJwt: process.env.JWT_SECRET,
    database: {
        host: process.env.DB_HOST || '',
        port: process.env.DB_PORT || '',
        dbName: process.env.DB_NAME || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || ''
    },
    mysqlService: {
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3001
    },
    postService: {
        port: process.env.POTS_SERVICE_PORT || 3002
    },
    cacheService: {
        host: process.env.CACHE_SERVICE_HOST|| 'localhost',
        port: process.env.CACHE_SERVICE_PORT || 3003
    },
    redisService: {
        host: process.env.REDIS_SERVICE_HOST,
        port: process.env.REDIS_SERVICE_PORT,
        password: process.env.REDIS_SERVICE_PASSWORD
    }
}


module.exports = config;