const db = require("../../data/dbConfig")


function find() {
  return db("users")
    .select("id", "username")
}


function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter)
}


function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first()
}


function removeUser(id) {
  return db("users")
    .where("id", id)
    .del()
}


async function add(user) {
  const [id] = await db("users").insert(user)
    return findById(id)
}



module.exports = {
  find,
  findBy,
  findById,
  removeUser,
  add
}