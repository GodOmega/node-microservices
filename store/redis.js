const redis = require('redis');
const config = require('../config');

const client = redis.createClient('redis://localhost:6379');

client.connect()

async function list({table}) {
    try {   
        const response = await client.get(table);
        return response ? JSON.parse(response) : null
    } catch (error) {
        throw new Error(error.message)
    }
}

async function get({table, id}){
    
}

async function upsert({table, data}){
    let key = table;
    if(data && data.id) {
        key = key + '_' + data.id 
    }

    client.setEx(key, 20, JSON.stringify(data));
    return true;
}


module.exports = {
    list,
    get,
    upsert
}