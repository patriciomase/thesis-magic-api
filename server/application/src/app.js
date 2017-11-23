'use strict'
const express = require('express');
const app = express();

// Libraries.
const Endpoints = require('./libraries/endpoints');

app.get(
  '/',
  (req, res) => {
    console.log('params', req.params);
    res.send('Hello World!')
  }
);

app.get(
  '/endpoints/:name',
  (req, res) => {
    Endpoints.save(
      req.params.name, {
        name: req.params.name,
        uri: '/' + req.params.name
      },
      'endpoints'
    );
    res.send('Saved! (I think)');
  }
);

app.listen(
  3333,
  () => console.log('Example app listening on port 3333!')
);
