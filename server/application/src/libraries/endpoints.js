'use strict';

// Libraries.
const as = require('./as');

class Endpoint {
  constructor() {
    const d = new Date();
    this.state = {
      created: d.getTime(),
      deleted: 0,
      updated: d.getTime(),

      description: 'Some basic endpoint information.',
      entityType: 'endpoint',
      fields: [],
      name: '',
      uri: ''
    }
  }

  setDescription(description) {
    // @TODO validations here.
    this.state.description = description;
  }

  setName(name) {
    // @TODO validations here.
    this.state.name = name;
  }

  setUri(uri) {
    // @TODO validations here.
    this.state.uri = uri;
  }

  forResponse() {
    return {
      description: this.description,
      fields: this.fields,
      name: this.name,
      uri: this.uri
    }
  }

  forSaving() {
    return this.state;
  }
}

exports.get = async () => {
  console.log('awaiting getAll');
  const response = await as.getAll('main');
  return response;
}

exports.save = async (uri, data) => {
  // Create a new endpoint.
  let newEndpoint = new Endpoint();

  // Fill it with the request data.
  newEndpoint.setDescription(data.description);
  newEndpoint.setName(data.name);
  newEndpoint.setUri(uri);

  const response = await as.put(uri, newEndpoint.forSaving());
  return response;
}
