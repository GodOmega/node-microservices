module.exports = (injectedStore) => {
  const TABLE = "posts";
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  // USES CASES

  async function list(){
     return await store.list({table: TABLE})
  }

  async function addPost(data) {
      return await store.upsert({table: TABLE, data});
  }


  return {
   list,
   addPost
  };
};
