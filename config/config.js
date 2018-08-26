require('dotenv-extended').load({
  encoding: 'utf8',
  silent: true,
  path: '.env',
  defaults: '.env.defaults',
  schema: '.env.schema',
  errorOnMissing: false,
  errorOnExtra: false,
  assignToProcessEnv: true,
  overrideProcessEnv: false
});

module.exports = {
  "development": {
    "username": process.env.DEVELOPMENT_DB_USERNAME,
    "password": process.env.DEVELOPMENT_DB_PASSWORD,
    "database": process.env.DEVELOPMENT_DB_NAME,
    "host": process.env.DEVELOPMENT_DB_HOST,
    "dialect": process.env.DEVELOPMENT_DB_DIALECT
  },
  "test": {
    "username": process.env.TEST_DB_USERNAME,
    "password": process.env.TEST_DB_USERNAME,
    "database": process.env.TEST_DB_USERNAME,
    "host": process.env.TEST_DB_USERNAME,
    "dialect": process.env.TEST_DB_USERNAME
  },
  "production": {
    "username": process.env.PRODUCTION_DB_USERNAME,
    "password": process.env.PRODUCTION_DB_PASSWORD,
    "database": process.env.PRODUCTION_DB_NAME,
    "host": process.env.PRODUCTION_DB_HOST,
    "dialect": process.env.PRODUCTION_DB_DIALECT
  }
}
