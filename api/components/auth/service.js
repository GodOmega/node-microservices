const auth = require("../../../auth");
const bcrypt = require("bcrypt");

module.exports = (injectedStore) => {
  const TABLE = "auths";
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  // USES CASES

  async function login({ username, password }) {
    const filter = {
      username,
    };

    const data = await store.query({ table: TABLE, filter });
    const isAuth = await bcrypt.compare(password, data.password);

    if (!isAuth) {
      throw new Error("Ha ocurrido un error o su información es invalida");
    }

    // Generate and return token
    return auth.sign(data);
  }

  async function upsert({ id, username, password }) {
    const authData = {
      id: id,
    };

    if (username) {
      authData.username = username;
    }

    if (password) {
      authData.password = await bcrypt.hash(password, 10);
    }

    return store.upsert({ table: TABLE, data: authData });
  }

  return {
    upsert,
    login,
  };
};
