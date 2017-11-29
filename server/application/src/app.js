'use strict'
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Libraries.
const Endpoints = require('./libraries/endpoints');
const Responses = require('./libraries/responses');

app.get(
  '/',
  (req, res) => {
    console.log('params', req.params);
    res.json(
      Responses.data(
        'Hello World!'
      )
    );
  }
);

app.delete(
  '/endpoints/:uri',
  async (req, res) => {
    const result = await Endpoints.softDelete(req.params.uri);
    res.json(
      Responses.data(result)
    );
  }
)

app.get(
  '/endpoints',
  async (req, res) => {
    const result = await Endpoints.get();
    res.json(
      Responses.data(result)
    );
  }
);

app.post(
  '/endpoints/:uri',
  async (req, res) => {
    const result = await Endpoints.save(
      req.params.uri, {
        name: req.body.name,
        description: req.body.description
      }
    );
    res.json(
      Responses.data(result)
    );
  }
);

app.listen(
  3333,
  () => console.log('Example app listening on port 3333!')
);
