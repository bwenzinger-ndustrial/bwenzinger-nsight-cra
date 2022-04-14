'use strict';

const factory = require('rosie').Factory;
const { times } = require('lodash');
const faker = require('faker');

factory.define('weather').attrs({
  time: () => faker.date.recent(40),
  data: () =>
    times(faker.random.number({ min: 1, max: 10 }), () => {
      return {
        date: () => faker.date.recent(40),
        temperatureHigh: () => faker.date.recent(40),
        temperatureLow: () => faker.date.recent(40),
        temperatureMax: () => faker.date.recent(40)
      };
    })
});
