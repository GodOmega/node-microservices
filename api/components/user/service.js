const { nanoid } = require("nanoid");
const auth = require('../auth');

module.exports = (injectedStore, injectedCache) => {
  const TABLE = "users";
  let store = injectedStore;
  let cache = injectedCache;

  if (!store) {
    store = require("../../../store/dummy");
  }

  if(!cache) {
    cache = require("../../../store/dummy");
  }

  async function list() {
    const data = { table: TABLE };
    let users = await cache.list(data);

    if(users) {
      console.log('Traemos users del cache')
    }

    if(!users) {
      console.log('No estaba en cache')
      users = await store.list(data);
      cache.upsert({table: TABLE, data: users})
    }

    return users;
  }

  async function get({ id }) {
    const data = { table: TABLE, id };
    return await store.get(data);
  }

  async function upsert(user) {
    if (!user.id) {
      user.id = nanoid();
    }

    if (user.password && user.username) {
      return await auth.upsert({
        id: user.id,
        username: user.username,
        password: user.password,
      });
    }
    
    const data = {
      id: user.id,
      name: user.name,
      username: user.username
    };

    console.log(data)
    return await store.upsert({table: TABLE, data});
  }

  async function follow({userId, followId}){
    const data = {
      user_from: userId,
      user_to: followId,
    }

    store.upsert({table: 'user_follow', data})
  }

  return {
    list,
    get,
    upsert,
    follow
  };
};
