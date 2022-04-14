const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('portfolioDetailKpiMetric').attrs({
  value: faker.random.number(),
  isEstimated: false,
  effectiveStartDate: faker.date.past().toISOString(),
  effectiveEndDate: faker.date.recent().toISOString()
});
