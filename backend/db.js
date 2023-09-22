'use strict';

// const url = 'mongodb://gauravu:nsve0AQncC2V92Ed@harmony-qa-shard-00-00-ukujg.mongodb.net:27017,harmony-qa-shard-00-01-ukujg.mongodb.net:27017,harmony-qa-shard-00-02-ukujg.mongodb.net:27017/harmony?authSource=admin&replicaSet=harmony-qa-shard-0&readPreference=primary&ssl=true'
//'mongodb://gauravu:nsve0AQncC2V92Ed@harmony-qa-shard-00-00-ukujg.mongodb.net/harmony'
//prod url
const { init } = require('exframe-db');

const logger = {}

var conn2 = init({ logger, name: '', dbUrl: '' });
  const ready2 = conn2.connect()
  .then(
    () =>  true,
    error => {
      console.log('Failed to connect to the harmony database', { errorData: error });
      throw error;
    }
  );

  const ready = Promise.all([ready2])
 
module.exports = { ready, db2: conn2.mongoose };