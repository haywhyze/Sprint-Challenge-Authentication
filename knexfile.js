// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' }, // change this if you want a different name for the database
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/authtest.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
