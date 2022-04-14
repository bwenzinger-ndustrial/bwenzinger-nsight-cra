'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('rate')
  .option('fromServer', false)
  .attrs({
    id: () => faker.random.uuid(),
    energySea: () => faker.random.uuid(),
    demandSea: () => faker.random.uuid(),
    unitStart: () => faker.random.number({ min: 0, max: 100 }),
    unitStop: () => faker.random.number({ min: 100, max: 1000 }),
    unit: () => faker.lorem.word(),
    rate: () => Math.random()
  })
  .after((rate, options) => {
    // If building a rate object that comes from the server, transform it to
    // have camel case and capital letters in the right spots
    if (options.fromServer) {
      rate.energy_sea = rate.energySea;
      delete rate.energySea;

      rate.demand_sea = rate.demandSea;
      delete rate.demandSea;

      rate.unit_start = rate.unitStart;
      delete rate.unitStart;

      rate.unit_stop = rate.unitStop;
      delete rate.unitStop;
    }
  });
