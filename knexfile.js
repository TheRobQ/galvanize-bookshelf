'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_dev',
    migration: {
      connection: './migrations'
    },
    seed: {
      connection: './seeds'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_test',
    migration: {
      connection: './migrations'
    },
    seed: {
      connection: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
