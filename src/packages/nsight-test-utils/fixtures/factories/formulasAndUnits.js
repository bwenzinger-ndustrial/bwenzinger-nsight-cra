'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory.define('formulasAndUnits').attrs({
  label: () =>
    faker.random.arrayElement([
      'facility_monthly_kwh_per_cuft',
      'facility_daily_kwh_per_lbs',
      'facility_monthly_energy_spend_per_lbs',
      'facility_monthly_kwh_per_revenue'
    ]),
  units: faker.random.words(2),
  formula: () =>
    faker.random.arrayElement([
      'sum(facility_daily_electricity_usage) / max(facility_daily_cubic_footage)',
      'facility_daily_electricity_usage / ((facility_daily_inbound_volume + facility_daily_outbound_volume) / 1000)',
      'sum(facility_daily_electricity_spend) / ((sum(facility_daily_inbound_volume) + sum(facility_daily_outbound_volume)) / 1000)',
      'sum(facility_daily_electricity_usage) / sum(facility_daily_revenue)'
    ])
});
