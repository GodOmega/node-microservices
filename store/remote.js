const request = require('request');


function createRemoteDB(host, port){
    const URL = `http://${host}:${port}`

    async function list({table}){
        return await req('GET', {table, data: {}});
    }

    function get({table, id}){
        return req('GET', {table, data: {id}});
    }

    function insert({table, data}){
        return req('POST', {table, data: {body: data}});

    }

    function upsert(data){
        return insert(data)

    }

    function req(method,{table, data}){
        let url = `${URL}/${table}`;
        let body = ''
        
        if(method == 'GET' && data.id){
            url = `${url}/${data.id}`
        }

        if(method == 'POST' && data.body){
            body = JSON.stringify(data.body);
        }
        
        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }, (err, req, body) => {
                if(err) {
                    console.log('Error con la base de datos remota', err);
                    return reject(err.message)
                }

                const response = JSON.parse(body);
                return resolve(response.data)
            })
        });
    }

    return {
        list,
        get,
        insert,
        upsert
    }
}

module.exports = createRemoteDB;