'use strict';

const entityType = 'endpoint';
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
      entityType: entityType,
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
  const response = await as.getAll(entityType);
  return response;
}

exports.save = async (uri, data) => {
  // Create a new endpoint.
  let newEndpoint = new Endpoint();

  // Fill it with the request data.
  newEndpoint.setDescription(data.description);
  newEndpoint.setName(data.name);
  newEndpoint.setUri(uri);

  const response = await as.put(
    uri,
    newEndpoint.forSaving(),
    entityType
  );
  return response;
}

exports.softDelete = async (uri) => {
  let endpointData = await as.get(uri, entityType);
  // @TODO validate if endpoint exists.
  const d = new Date();
  endpointData.deleted = d.getTime();
  const response = await as.put(
    uri,
    endpointData,
    entityType
  );
  return response;
}
