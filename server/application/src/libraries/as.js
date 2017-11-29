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
const connect = () => {
  return new Promise((resolve, reject) => {

    client.connect((error) => {
      if (error) {
        // handle failure
        console.log(`Connection to Aerospike cluster failed: ${error}`);
        reject(error);
      } else {
        // handle success
        console.log('Connection to Aerospike cluster succeeded!')
        resolve();
      }
    });
  });
}

exports.get = async (id, bucket = 'main') => {
  if (!client.isConnected()) {
    await connect();
  }

  const key = new Key('test', bucket, id);
  let bins = null;
  await client.get(key, (error, record, meta) => {
    if (error) {
      // Check if record not found probably user is loggin in by first time.
      if (error.message === 'AEROSPIKE_ERR_RECORD_NOT_FOUND') {
        console.log('Record not found');
      } else {
        console.log('error getting record', error);
      }
    } else {
      bins = record.bins;
    }
  });
  return bins;
}

// Get all records in a bucket.
exports.getAll = async (bucketName) => {
  if (!client.isConnected()) {
    await connect();
  }

  return new Promise((resolve, reject) => {
    var scan = client.scan('test', bucketName);
    scan.priority = Aerospike.scanPriority.LOW;
    // scan.select('uri');
  
    const stream = scan.foreach()
    let results = [];
    stream.on('error', (error) => { 
      // throw error
      console.log('error scanning', error);
    });
  
    stream.on('data', (record) => {
      results.push(record.bins);
    })
    stream.on('end', () => {
      resolve(results);
    });
  });
}

/**
 * Read multiple records
 */
exports.getMulti = async (idsArray) => {

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

exports.put = async (id, record, bucket = 'main') => {
  if (!client.isConnected()) {
    await connect();
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
