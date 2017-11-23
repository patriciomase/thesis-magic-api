'use strict';

// Libraries.
const as = require('./as');

exports.save = async (id, history) => {
  const response = await as.put(id, history);
  return response;
}
