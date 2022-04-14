'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('feedStatus')
  .sequence('id')
  .attrs({
    boxTagLabel: null,
    feedType: () => ({
      type: faker.random.arrayElement([
        'acquilite',
        'egauge',
        'infor',
        'logical',
        'monnit',
        'ngest',
        'technisystems'
      ])
    }),
    groupings: [],
    key: () => faker.finance.iban(),
    status: () => {
      return faker.random.arrayElement(['Healthy', 'Critical']);
    },
    statusEventId: () => faker.random.uuid(),
    updatedAt: () => faker.date.recent().toISOString()
  });
