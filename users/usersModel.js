const db = require('../database/dbConfig.js');

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
