'use strict';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';

const factory = require('rosie').Factory;
const faker = require('faker');

factory.define('kpiConfig').attrs({
  label: () => faker.random.words(),
  unit: () => faker.random.word(),
  unitPosition: () => faker.random.arrayElement(['prefix', 'postfix']),
  isNegativeIndicator: () => faker.random.boolean(),
  dailyKey: () => faker.lorem.slug(),
  slug: () => faker.lorem.slug(),
  monthly: () => ({
    key: faker.lorem.slug()
  }),
  daily: () => ({
    key: faker.lorem.slug()
  }),
  tooltip: () => faker.random.words(),
  interval: () => faker.random.number(),
  compareBy: () =>
    faker.random.arrayElement(Object.values(kpiEnums.COMPARE_BY_TYPES)),
  comparisonMetric: () => faker.lorem.slug(),
  primaryMetric: () => faker.lorem.slug(),
  detail: () => ({
    chartType: faker.random.word(),
    breakdown: [
      {
        name: faker.random.words(),
        icon: faker.random.word(),
        isNegativeIndicator: faker.random.boolean(),
        key: faker.lorem.slug(),
        unit: faker.random.word()
      }
    ]
  })
});
