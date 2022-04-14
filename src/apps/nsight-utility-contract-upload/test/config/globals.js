'use strict';

const chai = require('chai');
const enzyme = require('enzyme');
const faker = require('faker');
const sinon = require('sinon');
const fixtureFactories = require('../fixtures/factories');

global.expect = chai.expect;
global.faker = faker;
global.fixture = fixtureFactories;
global.sandbox = sinon.sandbox;
global.shallow = enzyme.shallow;

const clientId = faker.random.uuid();

window.nd = {
  clientId,
  env: 'test',
  application: {
    clientId: clientId
  },
  services: {
    ems: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    },
    iot_v2: {
      clientId: faker.internet.password(),
      host: faker.internet.url()
    }
  }
};
