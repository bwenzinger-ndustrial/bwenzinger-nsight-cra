'use strict';

const chai = require('chai');
const enzyme = require('enzyme');
const faker = require('faker');
const sinon = require('sinon');

global.expect = chai.expect;
global.faker = faker;
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
    }
  }
};
