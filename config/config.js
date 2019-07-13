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
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.TEST_DBUSERNAME,
    "password": process.env.TEST_DBPASSWORD,
    "database": process.env.TEST_DBNAME,
    "host": process.env.TEST_DBHOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PRODUCTION_DBUSERNAME,
    "password": process.env.PRODUCTION_DBPASSWORD,
    "database": process.env.PRODUCTION_DBNAME,
    "host": process.env.PRODUCTION_DBHOST,
    "dialect": "mysql"
  }
}
