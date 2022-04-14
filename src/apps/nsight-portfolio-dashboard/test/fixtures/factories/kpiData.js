'use strict';

const faker = require('faker');
const { times } = require('lodash');
const moment = require('moment');
const factory = require('rosie').Factory;

const KPI_TYPES = {
  energy_spend_per_lbs: {
    name: 'Energy $ / LB',
    unit: '$'
  },
  energy_usage_per_lbs: {
    name: 'kWh / LB',
    unit: '$'
  },
  eui: {
    name: 'EUI',
    unit: ''
  },
  kwh_per_revenue: {
    name: 'kWh / Revenue',
    unit: 'kWh'
  }
};

factory
  .define('portfolioKpiData')
  .option('year', 2018)
  .attr('key', () => faker.random.arrayElement(Object.keys(KPI_TYPES)))
  .attr('endDate', ['year'], (year) => `Dec 31 ${year}`)
  .attr('name', ['key'], (key) => KPI_TYPES[key].name)
  .attr('startDate', ['year'], (year) => `Jan 01 ${year}`)
  .attr('unit', ['key'], (key) => KPI_TYPES[key].unit)
  .attr('values', ['unit', 'year'], (unit, year) => {
    const initialDate = moment(new Date(year, 0, 1));

    return times(365, (i) => {
      return {
        unit,
        date: initialDate
          .clone()
          .dayOfYear(i + 1)
          .toISOString(),
        value: faker.random.number()
      };
    });
  });

factory.define('portfolioDetailKpiMetric').attrs({
  value: faker.random.number(),
  isEstimated: false,
  effectiveStartDate: faker.date.past().toISOString(),
  effectiveEndDate: faker.date.recent().toISOString()
});
