//the defaults in this file are for team grant dev environment
export default {
  postgres: {
    user: process.env.POSTGRES_USER || 'tadmin',
    host: process.env.POSTGRES_HOST || 'db',
    database: process.env.POSTGRES_DB || 'training',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: process.env.POSTGRES_PORT || 5432,
  }
}