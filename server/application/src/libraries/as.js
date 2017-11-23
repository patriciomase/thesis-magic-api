'use strict';

/* aerospike library */
const Aerospike = require('aerospike');
const Key = Aerospike.Key;

/* client initialization */
const client = Aerospike.client({
  hosts: [
    { addr: 'aerospike1', port: 3000 }
  ]
});

/**
 * Try to connect to a cluster
 */
function connect() {
  /* conecting to the cluster */
  client.connect(function (error) {
    if (error) {
      // handle failure
      console.log(`Connection to Aerospike cluster failed: ${error}`)
    } else {
      // handle success
      console.log('Connection to Aerospike cluster succeeded!')
    }
  });
}

exports.put = (id, record, bucket = 'main') => {
  if (!client.isConnected()) {
    connect();
  }

  return new Promise((resolve, reject) => {

    const key = new Key('test', bucket, id);

    client.put(key, record, (error) => {

      if (error) {
        reject(error.message);
      } else {
        resolve(id);
      }
    });
  });
};

exports.get = (id, bucket = 'main') => {

  if (!client.isConnected()) {
    connect();
  }

  return new Promise((resolve, reject) => {

    const key = new Key('test', bucket, id);

    client.get(key, (error, record, meta) => {
      if (error) {
        // Check if record not found probably user is loggin in by first time.
        if (error.message === 'AEROSPIKE_ERR_RECORD_NOT_FOUND') {
          resolve(null);
        } else {
          console.log('error getting record', error);
          reject(error);
        }
      } else {
        resolve(record);
      }
    });
  });
};

/**
 * Read multiple records
 */
exports.getMulti = (idsArray) => {

  if (!client.isConnected()) {
    connect();
  }

  return new Promise((resolve, reject) => {

    /* Specify the batch of keys of the records to be read. */
    let readKeys = [];

    idsArray.forEach((id) => {
      readKeys.push({
        key: new Key('test', 'main', id),
        read_all_bins: true
      });
    });

    // Read the batch of records.
    client.batchRead(readKeys, function (error, results) {
      if (error) {
        console.log('ERROR - %s', error.message);
        reject(error.message);
      } else {
        let resultBins = [];
        results.forEach(result => {
          switch (result.status) {
            case 0:
              resultBins.push(result.bins);
              break
            case 1:
              console.log("NOT_FOUND - ", result.key);
              break
            default:
              console.log("ERROR - %d - %s", result.status, result.key);
          }
        });
        resolve(resultBins);
      }
    });
  });
}
