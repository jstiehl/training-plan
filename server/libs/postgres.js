/**
 * Util library to setup a postgres connection to use throughout application
 * connection is initialized in server js
 */
import config from '../config'
import promise from 'bluebird'

const initOptions = {
  promiseLib: promise,
  // global event notification;
  error: function(error, e) {
    if (e.cn) {
      // A connection-related error;
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log('CN:', e.cn)
      console.log('EVENT:', error.message || error)
    }
  },
  promiseLib: promise,
}

const pgp = require('pg-promise')(initOptions)

export default {
  db: pgp(config.postgres),
}