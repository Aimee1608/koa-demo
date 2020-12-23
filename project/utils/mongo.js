const pmongo = require('promised-mongo');
const config = require('../config')
let instance;
const db = function() {
  if (!instance) {
    const DBConfig = config.mongodb;
    const servers = [{
      host: DBConfig.host,
      port: DBConfig.port
    }];
    instance = pmongo({
      server_options: { socketOptions: {} },
      db_options: { read_preference_tags: null, read_preference: 'primary' },
      rs_options: { socketOptions: {}, rs_name: DBConfig.rs_name },
      mongos_options: {},
      dbName: DBConfig.database,
      servers: servers,
      auth: (DBConfig.user && DBConfig.password) ? { user: DBConfig.user, password: DBConfig.password } : null
    });
  }
  return instance;
};

module.exports = {
  db,
  pmongo
}