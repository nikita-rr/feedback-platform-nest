import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg', // или 'mysql2', если используете MySQL
    connection: {
      host: 'localhost',
      user: 'your_user',
      password: 'your_password',
      database: 'your_database',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: 'production_host',
      user: 'production_user',
      password: 'production_password',
      database: 'production_database',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;
