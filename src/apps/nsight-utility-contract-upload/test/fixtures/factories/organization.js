'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;
const slugify = require('slug');

factory
  .define('organization')
  .attrs({
    id: () => faker.random.uuid(),
    value: () => faker.random.uuid(),
    label: () => faker.company.companyName()
  })
  .attr('slug', ['label'], (label) => slugify(label, { lower: true }));
