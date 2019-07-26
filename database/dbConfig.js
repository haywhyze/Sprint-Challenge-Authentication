const knex = require('knex');

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(config[dbEnv]);