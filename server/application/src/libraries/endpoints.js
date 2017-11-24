'use strict';

// Libraries.
const as = require('./as');

exports.get = async () => {
  console.log('awaiting getAll');
  const response = await as.getAll('main');
  return response;
}

exports.save = async (id, history) => {
  const response = await as.put(id, history);
  return response;
}
