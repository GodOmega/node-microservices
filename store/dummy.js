const db = {
    users: [
        { id: 1, name: 'Omega' },
        { id: 2, name: 'Alpha' }
    ]
};

function list({table}){
    return db[table] || [];
}

function get({table, id}){
    const collection = list({table});

    return collection.find(item => item.id == id) || null;
}

function upsert({table, data}){

    if(!db[table]) {
        db[table] = [];
    }

    db[table].push(data);
    return data
}

function remove({table, id}){
    return true;
}

async function query({table, filter: { username }}) {
    const collection = list({table});
    return collection.find(item => item.username === username) || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}