'use strict';

const faker = require('faker');

const clientId = faker.random.uuid();

window.nd = {
  clientId,
  env: 'test',
  application: {
    clientId: clientId,
    id: faker.random.number()
  },
  legacyNSightBaseUrl: faker.internet.url(),
  services: {
    ems: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    events: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    facilities: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    files: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    iot: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    iot_v2: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    rates: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    sis: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    coincident_peak: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    }
  }
};
