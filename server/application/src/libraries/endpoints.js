'use strict';

// Libraries.
const as = require('./as');

exports.save = (id, history) => {
  as
    .put(id, history)
    .then(response => {
      console.log('History Saved');
    })
    .catch(error => {
      console.log('hisotry-bag: error saving', error);
    });
}
