const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.dbName
}

// Connect

let connection;

function handleCon(){
    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if(err) {
            console.error('[DB error]', err)
            setTimeout(handleCon, 2000);
        }else {
            console.log('DB Connected')
        }
        
    });

    connection.on('error', (err) => {
        console.error('[DB error]', err)
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            throw err;
        }
    })
}

handleCon();

function list({table}){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) {
                return reject(err)
            }

            return resolve(data);
        })
    })
}

function get({table, id}){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id ='${id}'`, (err, data) => {
            if(err) {
                return reject(err)
            }

            return resolve(data);
        })
    })
}

function insert({table, data}){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data , (err, result) => {
            if(err) {
                return reject(err)
            }

            return resolve(result);
        })
    })
}

function upsert(data) {
    return insert(data);
}

module.exports = {
    list,
    get,
    upsert
}